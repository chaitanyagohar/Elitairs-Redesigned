"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "@/app/admin/CloudinaryUploader";

export default function AdminProjectForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEditMode = !!initialData?.id;
  const [saving, setSaving] = useState(false);

  // --- STATE ---
  const [formData, setFormData] = useState({
    // Basic
    title: initialData?.title || "",
    propertyType: initialData?.propertyType || "Residential",
    builder: initialData?.builder || "",
    otherBuilder: "",
    location: initialData?.location || "",
    city: initialData?.city || "Gurgaon",
    rera: initialData?.rera || "",
    
    // Description
    overview: initialData?.overview || "",
    videoUrl: initialData?.videoUrl || "", 
    googleMapUrl: initialData?.googleMapUrl || "",

    // Arrays
    connectivity: initialData?.connectivity || [],
    nearbyAmenities: initialData?.nearbyAmenities || [], 
    amenities: initialData?.amenities || [], // Text amenities (legacy/simple)

    // Visual Assets
    projectAmenities: initialData?.projectAmenities || [], // {name, icon} - "Icon" here acts as the Image URL
    floorPlans: initialData?.floorplans || [], // {url, alt} - "Alt" here acts as the Title

    // Media
    coverImage: initialData?.coverImage || "",
    brochureUrl: initialData?.brochure || "",
    gallery: initialData?.gallery || [], 
    
    // Details
    price: initialData?.price || "",
    launchDate: initialData?.launchDate || "",
    totalUnits: initialData?.totalUnits || "",
    area: initialData?.area || "", 
  });

  // --- LOCAL STATE FOR NEW AMENITY ---
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityImage, setNewAmenityImage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper: Arrays
  const addItem = (field: "connectivity" | "nearbyAmenities" | "amenities", value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] as string[]), value] }));
  };

  const removeItem = (field: "connectivity" | "nearbyAmenities" | "amenities", index: number) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] as string[]).filter((_, i) => i !== index) }));
  };

  // Helper: Visual Amenities
  const addVisualAmenity = () => {
    if (!newAmenityName || !newAmenityImage) return alert("Please enter name and upload image");
    setFormData(prev => ({
      ...prev,
      projectAmenities: [...prev.projectAmenities, { name: newAmenityName, icon: newAmenityImage }]
    }));
    setNewAmenityName("");
    setNewAmenityImage("");
  };

  const removeVisualAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projectAmenities: prev.projectAmenities.filter((_: any, i: number) => i !== index)
    }));
  };

  // Helper: Floor Plans (Unified)
  const addFloorPlan = (res: any) => {
    if (!res?.url) return;
    // Add new plan with empty title (alt)
    setFormData(prev => ({
      ...prev,
      floorPlans: [...prev.floorPlans, { url: res.url, alt: "" }]
    }));
  };

  const updateFloorPlanTitle = (index: number, title: string) => {
    const updated = [...formData.floorPlans];
    updated[index].alt = title;
    setFormData(prev => ({ ...prev, floorPlans: updated }));
  };

  const removeFloorPlan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      floorPlans: prev.floorPlans.filter((_: any, i: number) => i !== index)
    }));
  };

  // Helper: Gallery
  const addGalleryImage = (res: any) => {
    if (!res?.url) return;
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, { url: res.url, alt: "" }]
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const finalBuilder = formData.builder === "Other" ? formData.otherBuilder : formData.builder;
      
      const payload = { 
        ...formData, 
        builder: finalBuilder,
        // Ensure arrays
        connectivity: formData.connectivity || [],
        nearbyAmenities: formData.nearbyAmenities || [],
        projectAmenities: formData.projectAmenities || [],
        gallery: formData.gallery || [],
        floorPlans: formData.floorPlans || []
      };

      const url = isEditMode ? `/api/projects/${initialData.id}` : `/api/projects/create`;
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save project");
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error saving project");
    } finally {
      setSaving(false);
    }
  };

  const InputList = ({ label, field, placeholder }: { label: string, field: "connectivity" | "nearbyAmenities" | "amenities", placeholder: string }) => (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <input id={`input-${field}`} className="flex-1 border p-2 rounded text-sm text-black w-full" placeholder={placeholder} />
        <button type="button" onClick={() => {
          const el = document.getElementById(`input-${field}`) as HTMLInputElement;
          addItem(field, el.value);
          el.value = "";
        }} className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 text-black w-full sm:w-auto">+</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {formData[field].map((item: string, i: number) => (
          <span key={i} className="bg-gray-50 border px-2 py-1 text-xs rounded flex items-center gap-2 text-gray-700">
            {item} <button type="button" onClick={() => removeItem(field, i)} className="text-red-500 font-bold">×</button>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-white p-4 sm:p-10 rounded-xl shadow-sm border border-gray-200 text-black">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{isEditMode ? "Edit Project" : "Add New Project"}</h1>
        <div className="flex gap-3 w-full sm:w-auto">
           <button type="button" onClick={() => router.back()} className="flex-1 sm:flex-none px-4 py-2 border rounded text-gray-600 hover:bg-gray-50 text-center">Cancel</button>
           <button type="submit" disabled={saving} className="flex-1 sm:flex-none px-6 py-2 bg-[#FFC40C] text-black font-bold rounded hover:bg-yellow-500 disabled:opacity-50 text-center">
             {saving ? "Saving..." : "Save"}
           </button>
        </div>
      </div>

      {/* A. BASIC INFO */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">A. Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2 md:col-span-1"><label className="block text-sm font-medium mb-1">Title *</label><input required name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" /></div>
          <div className="sm:col-span-2 md:col-span-1"><label className="block text-sm font-medium mb-1">Type *</label><select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full border p-2 rounded"><option>Residential</option><option>Commercial</option></select></div>
          <div><label className="block text-sm font-medium mb-1">Builder *</label><select name="builder" value={formData.builder} onChange={handleChange} className="w-full border p-2 rounded"><option value="Sobha">Sobha</option><option value="Other">Other</option></select>{formData.builder === "Other" && <input name="otherBuilder" value={formData.otherBuilder} onChange={handleChange} className="w-full border p-2 mt-2 rounded" placeholder="Name"/>}</div>
          <div><label className="block text-sm font-medium mb-1">City *</label><select name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded"><option>Gurgaon</option><option>New Delhi</option></select></div>
          <div><label className="block text-sm font-medium mb-1">Location *</label><input required name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" /></div>
          <div><label className="block text-sm font-medium mb-1">RERA Number</label><input name="rera" value={formData.rera} onChange={handleChange} className="w-full border p-2 rounded" /></div>
        </div>
      </div>

      {/* B. DESCRIPTIONS */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">B. Details & Surroundings</h3>
        <div className="space-y-6">
          <div><label className="block text-sm font-medium mb-1">Overview *</label><textarea required name="overview" value={formData.overview} onChange={handleChange} rows={5} className="w-full border p-2 rounded" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div><label className="block text-sm font-medium mb-1">Intro Video</label><input name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="w-full border p-2 rounded" placeholder="YouTube Link" /></div>
             <div><label className="block text-sm font-medium mb-1">Google Map Embed</label><input name="googleMapUrl" value={formData.googleMapUrl} onChange={handleChange} className="w-full border p-2 rounded" placeholder="src link only" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <InputList label="Connectivity" field="connectivity" placeholder="e.g. Near Metro" />
             <InputList label="Nearby Amenities" field="nearbyAmenities" placeholder="e.g. Hospital 2km" />
          </div>
        </div>
      </div>

      {/* C. MEDIA */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">C. Media Assets</h3>
        
        {/* Cover & Brochure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="bg-gray-50 p-4 rounded border">
              <label className="block text-sm font-bold mb-2">Cover Image (Hero)</label>
              <CloudinaryUploader onUpload={(res) => { if(res?.url) setFormData(prev => ({...prev, coverImage: res.url})) }} />
              {formData.coverImage && <img src={formData.coverImage} className="mt-4 h-40 w-full object-cover rounded shadow-sm" />}
           </div>
           <div className="bg-gray-50 p-4 rounded border">
              <label className="block text-sm font-bold mb-2">Brochure (PDF)</label>
              <CloudinaryUploader label="Upload PDF" accept="application/pdf" onUpload={(res) => { if(res?.url) setFormData(prev => ({...prev, brochureUrl: res.url})) }} />
              {formData.brochureUrl && <p className="text-green-600 mt-2 text-sm">File Uploaded</p>}
           </div>
        </div>

        {/* Floor Plans - UNIFIED */}
        <div className="bg-gray-50 p-6 rounded border mb-8">
           <h4 className="font-bold mb-4 text-gray-900">1. Floor Plans & Master Plan</h4>
           <p className="text-xs text-gray-500 mb-4">Upload all plans here. Be sure to add a title (e.g., "Master Plan", "2BHK", "3BHK") for each.</p>
           
           <div className="mb-4"><CloudinaryUploader label="Add Plan" onUpload={addFloorPlan} /></div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.floorPlans.map((plan: any, i: number) => (
                <div key={i} className="relative group bg-white p-3 rounded border shadow-sm">
                   <div className="h-32 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded mb-2">
                      <img src={plan.url} className="max-h-full max-w-full object-contain" />
                   </div>
                   <input 
                      placeholder="Plan Title (e.g. Master Plan)" 
                      value={plan.alt || ""} 
                      onChange={(e) => updateFloorPlanTitle(i, e.target.value)}
                      className="w-full border p-2 text-sm rounded"
                   />
                   <button type="button" onClick={() => removeFloorPlan(i)} className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow">×</button>
                </div>
              ))}
           </div>
        </div>

        {/* Visual Amenities */}
        <div className="bg-gray-50 p-6 rounded border mb-8">
           <h4 className="font-bold mb-4 text-gray-900">2. Visual Amenities (Slider)</h4>
           <div className="flex flex-col sm:flex-row gap-4 mb-4 items-end bg-white p-4 rounded border">
              <div className="flex-1 w-full">
                 <label className="text-xs block mb-1 font-bold">Title (e.g. Pool)</label>
                 <input value={newAmenityName} onChange={(e) => setNewAmenityName(e.target.value)} className="w-full border p-2 rounded" />
              </div>
              <div className="flex-1 w-full">
                 <label className="text-xs block mb-1 font-bold">Image</label>
                 <CloudinaryUploader label="Upload Image" onUpload={(res) => { if(res?.url) setNewAmenityImage(res.url) }} />
                 {newAmenityImage && <p className="text-xs text-green-600 mt-1">Image Selected</p>}
              </div>
              <button type="button" onClick={addVisualAmenity} className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded">Add</button>
           </div>
           <div className="flex flex-wrap gap-4">
              {formData.projectAmenities.map((am: any, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded border shadow-sm">
                   <img src={am.icon} className="w-10 h-10 object-cover rounded" alt={am.name} />
                   <span className="text-sm font-medium">{am.name}</span>
                   <button type="button" onClick={() => removeVisualAmenity(i)} className="text-red-500 font-bold ml-2">×</button>
                </div>
              ))}
           </div>
        </div>

        {/* Gallery */}
        <div className="bg-gray-50 p-6 rounded border">
           <h4 className="font-bold mb-4 text-gray-900">3. Gallery</h4>
           <CloudinaryUploader label="Add Photos" onUpload={addGalleryImage} />
           <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
              {formData.gallery.map((img: any, i: number) => (
                <div key={i} className="relative group aspect-square">
                  <img src={img.url} className="w-full h-full object-cover rounded border" />
                  <button type="button" onClick={() => removeGalleryImage(i)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">×</button>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* D. SPECS */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">D. Specs & Launch Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
           <div><label className="block text-sm font-medium mb-1">Price</label><input name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" /></div>
           <div><label className="block text-sm font-medium mb-1">Launch</label><input name="launchDate" value={formData.launchDate} onChange={handleChange} className="w-full border p-2 rounded" /></div>
           <div><label className="block text-sm font-medium mb-1">Units</label><input name="totalUnits" value={formData.totalUnits} onChange={handleChange} className="w-full border p-2 rounded" /></div>
           <div><label className="block text-sm font-medium mb-1">Area</label><input name="area" value={formData.area} onChange={handleChange} className="w-full border p-2 rounded" /></div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t flex justify-end gap-4">
         <button type="button" onClick={() => router.back()} className="px-6 py-3 border rounded text-gray-700">Cancel</button>
         <button type="submit" disabled={saving} className="px-8 py-3 bg-[#FFC40C] text-black font-bold rounded hover:bg-yellow-500 disabled:opacity-50">
            {saving ? "Saving..." : "Save Project"}
         </button>
      </div>
    </form>
  );
}