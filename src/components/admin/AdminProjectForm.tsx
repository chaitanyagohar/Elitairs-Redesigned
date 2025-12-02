"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "@/app/admin/CloudinaryUploader";

const CONFIG_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK", "Penthouse", "Villa", "Plot"];
const CITY_OPTIONS = ["Gurugram", "New Delhi", "Noida", "Faridabad", "Dwarka"];

export default function AdminProjectForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEditMode = !!initialData?.id;
  const [saving, setSaving] = useState(false);

  // --- STATE ---
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    propertyType: initialData?.propertyType || "Residential",
    builder: initialData?.builder || "Sobha",
    otherBuilder: "",
    
    city: initialData?.city || "Gurugram",
    location: initialData?.location || "",
    rera: initialData?.rera || "",
    
    overview: initialData?.overview || "",
    videoUrl: initialData?.videoUrl || "", 
    googleMapUrl: initialData?.googleMapUrl || "",

    // Arrays
    connectivity: initialData?.connectivity || [],
    nearbyAmenities: initialData?.nearbyAmenities || [], 
    amenities: initialData?.amenities || [], // Legacy text amenities
    configurations: initialData?.configurations || [],

    // Visual Assets
    projectAmenities: initialData?.projectAmenities || [], // ✅ Visual Amenities (Name + Icon)
    floorPlans: initialData?.floorplans || [], 

    coverImage: initialData?.coverImage || "",
    brochureUrl: initialData?.brochure || "",
    gallery: initialData?.gallery || [], 
    
    price: initialData?.price || "",
    launchDate: initialData?.launchDate || "",
    totalUnits: initialData?.totalUnits || "",
    area: initialData?.area || "", 
  });

  // Local state for adding new Visual Amenity
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityImage, setNewAmenityImage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Smart Map Handler
  const handleMapChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = e.target.value;
    const srcMatch = input.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
        setFormData(prev => ({ ...prev, googleMapUrl: srcMatch[1] }));
    } else {
        setFormData(prev => ({ ...prev, googleMapUrl: input }));
    }
  };

  // BHK Configuration Toggle
  const toggleConfiguration = (config: string) => {
    setFormData(prev => {
        const current = prev.configurations || [];
        if (current.includes(config)) {
            return { ...prev, configurations: current.filter((c: string) => c !== config) };
        } else {
            return { ...prev, configurations: [...current, config] };
        }
    });
  };

  // --- ARRAY HELPERS ---
  const addItem = (field: "connectivity" | "nearbyAmenities" | "amenities", value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] as string[]), value] }));
  };
  const removeItem = (field: "connectivity" | "nearbyAmenities" | "amenities", index: number) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] as string[]).filter((_, i) => i !== index) }));
  };

  // ✅ VISUAL AMENITY HELPERS
  const addVisualAmenity = () => {
    if (!newAmenityName || !newAmenityImage) return alert("Please enter title and upload an icon image");
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

  // Media Helpers
  const addFloorPlan = (res: any) => { if (res?.url) setFormData(prev => ({ ...prev, floorPlans: [...prev.floorPlans, { url: res.url, alt: "" }] })); };
  const updateFloorPlanTitle = (index: number, title: string) => { const updated = [...formData.floorPlans]; updated[index].alt = title; setFormData(prev => ({ ...prev, floorPlans: updated })); };
  const removeFloorPlan = (index: number) => { setFormData(prev => ({ ...prev, floorPlans: prev.floorPlans.filter((_: any, i: number) => i !== index) })); };
  const addGalleryImage = (res: any) => { if (res?.url) setFormData(prev => ({ ...prev, gallery: [...prev.gallery, { url: res.url, alt: "" }] })); };
  const removeGalleryImage = (index: number) => { setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_: any, i: number) => i !== index) })); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const finalBuilder = formData.builder === "Other" ? formData.otherBuilder : formData.builder;
      const payload = { 
        ...formData, 
        builder: finalBuilder,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
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

  // Reusable Input List Component
  const InputList = ({ label, field, placeholder }: { label: string, field: "connectivity" | "nearbyAmenities" | "amenities", placeholder: string }) => (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
      <div className="flex gap-2 mb-2">
        <input id={`input-${field}`} className="flex-1 border p-2 rounded text-sm text-black" placeholder={placeholder} />
        <button type="button" onClick={() => {
          const el = document.getElementById(`input-${field}`) as HTMLInputElement;
          addItem(field, el.value);
          el.value = "";
        }} className="bg-gray-100 px-4 py-2 rounded text-black font-bold">+</button>
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
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">{isEditMode ? "Edit Project" : "Add New Project"}</h1>
        <div className="flex gap-3">
           <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancel</button>
           <button type="submit" disabled={saving} className="px-6 py-2 bg-[#FFC40C] text-black font-bold rounded hover:bg-yellow-500 disabled:opacity-50">
             {saving ? "Saving..." : "Save"}
           </button>
        </div>
      </div>

      {/* A. BASIC INFO */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">A. Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2 md:col-span-1">
             <label className="block text-sm font-medium mb-1">Title *</label>
             <input required name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Slug (URL) *</label>
             <input name="slug" value={formData.slug} onChange={handleChange} className="w-full border p-2 rounded text-gray-500" placeholder="Auto-generated if empty" />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">City *</label>
             <select name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded">
                {CITY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Location / Sector *</label>
             <input required name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" placeholder="e.g. Sector 150" />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Type *</label>
             <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full border p-2 rounded">
                 <option>Residential</option><option>Commercial</option><option>Plots</option>
             </select>
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Builder</label>
             <select name="builder" value={formData.builder} onChange={handleChange} className="w-full border p-2 rounded">
                 <option value="Sobha">Sobha</option><option value="DLF">DLF</option><option value="Godrej">Godrej</option><option value="Other">Other</option>
             </select>
             {formData.builder === "Other" && <input name="otherBuilder" value={formData.otherBuilder} onChange={handleChange} className="w-full border p-2 mt-2 rounded" placeholder="Builder Name"/>}
          </div>
        </div>
      </div>
      
      {/* B. UNIT CONFIGURATION */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">B. Unit Configuration</h3>
        <div className="bg-gray-50 p-6 rounded border">
            <label className="block text-sm font-bold mb-3">Select Available Units:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CONFIG_OPTIONS.map((conf) => (
                    <label key={conf} className="flex items-center gap-2 cursor-pointer bg-white p-3 rounded border shadow-sm hover:border-[#FFC40C]">
                        <input 
                            type="checkbox" 
                            checked={formData.configurations.includes(conf)} 
                            onChange={() => toggleConfiguration(conf)}
                            className="w-4 h-4 accent-[#FFC40C]"
                        />
                        <span className="text-sm font-medium">{conf}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>

      {/* C. DESCRIPTIONS & AMENITIES */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">C. Details & Surroundings</h3>
        <div className="space-y-6">
          <div><label className="block text-sm font-medium mb-1">Overview *</label><textarea required name="overview" value={formData.overview} onChange={handleChange} rows={5} className="w-full border p-2 rounded" /></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Video Upload */}
             <div className="bg-gray-50 p-4 rounded border">
                <label className="block text-sm font-bold mb-2">Intro Video (Upload)</label>
                <CloudinaryUploader 
                    label="Upload Video" 
                    accept="video/*" 
                    onUpload={(res) => { if(res?.url) setFormData(prev => ({...prev, videoUrl: res.url})) }} 
                />
                {formData.videoUrl && (
                    <div className="mt-2">
                        <video src={formData.videoUrl} controls className="w-full h-40 object-cover rounded bg-black" />
                        <button type="button" onClick={() => setFormData(prev => ({...prev, videoUrl: ""}))} className="text-xs text-red-500 underline mt-1">Remove Video</button>
                    </div>
                )}
             </div>

             {/* Smart Google Map */}
             <div>
                <label className="block text-sm font-medium mb-1">Google Map (Paste Embed Code)</label>
                <textarea 
                    name="googleMapUrl" 
                    value={formData.googleMapUrl} 
                    onChange={handleMapChange}
                    className="w-full border p-2 rounded h-40 text-xs font-mono text-gray-600" 
                    placeholder={'<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'} 
                />
             </div>
          </div>

          {/* Text Amenities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             <InputList label="Connectivity" field="connectivity" placeholder="e.g. Near Metro" />
             <InputList label="Nearby Landmarks" field="nearbyAmenities" placeholder="e.g. Hospital 2km" />
             <InputList label="Other Amenities (Text)" field="amenities" placeholder="e.g. Power Backup" />
          </div>
        </div>
      </div>

      {/* D. MEDIA & VISUAL ASSETS */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">D. Media & Visuals</h3>
        
        {/* 1. Cover & Brochure */}
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

        {/* ✅ 2. VISUAL AMENITIES (Title + Image) */}
        <div className="bg-gray-50 p-6 rounded border mb-8">
           <h4 className="font-bold mb-4 text-gray-900 text-lg">2. Project Amenities (with Icons)</h4>
           
           {/* Add New Input Row */}
           <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end bg-white p-4 rounded border shadow-sm">
              <div className="flex-1 w-full">
                 <label className="text-xs block mb-1 font-bold text-gray-500 uppercase">Amenity Title</label>
                 <input 
                    value={newAmenityName} 
                    onChange={(e) => setNewAmenityName(e.target.value)} 
                    placeholder="e.g. Swimming Pool"
                    className="w-full border p-2 rounded" 
                 />
              </div>
              <div className="flex-1 w-full">
                 <label className="text-xs block mb-1 font-bold text-gray-500 uppercase">Icon / Image</label>
                 <CloudinaryUploader label="Upload Icon" onUpload={(res) => { if(res?.url) setNewAmenityImage(res.url) }} />
                 {newAmenityImage && <p className="text-xs text-green-600 mt-1">Image Ready</p>}
              </div>
              <button type="button" onClick={addVisualAmenity} className="w-full sm:w-auto px-8 py-2 bg-black text-white font-bold rounded hover:bg-gray-800">
                Add
              </button>
           </div>

           {/* List of Added Amenities */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {formData.projectAmenities.map((am: any, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-white p-3 rounded border shadow-sm">
                   <img src={am.icon} className="w-12 h-12 object-cover rounded bg-gray-100" alt={am.name} />
                   <span className="text-sm font-medium">{am.name}</span>
                   <button type="button" onClick={() => removeVisualAmenity(i)} className="ml-auto text-red-500 font-bold bg-red-50 w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-100">×</button>
                </div>
              ))}
              {formData.projectAmenities.length === 0 && (
                <p className="text-sm text-gray-400 italic col-span-full">No amenities added yet.</p>
              )}
           </div>
        </div>
        
        {/* 3. Floor Plans */}
         <div className="bg-gray-50 p-6 rounded border mb-8">
            <h4 className="font-bold mb-4 text-gray-900 text-lg">3. Floor Plans</h4>
            <div className="mb-4"><CloudinaryUploader label="Add Plan" onUpload={addFloorPlan} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {formData.floorPlans.map((plan: any, i: number) => (
                <div key={i} className="relative group bg-white p-3 rounded border shadow-sm">
                   <div className="h-24 w-full bg-gray-100 mb-2 flex items-center justify-center rounded">
                      <img src={plan.url} className="max-h-full max-w-full object-contain" />
                   </div>
                   <input value={plan.alt || ""} onChange={(e) => updateFloorPlanTitle(i, e.target.value)} className="w-full border p-1 text-xs rounded" placeholder="Plan Title (e.g. 3BHK)" />
                   <button type="button" onClick={() => removeFloorPlan(i)} className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">×</button>
                </div>
              ))}
            </div>
         </div>
         
         {/* 4. Gallery */}
         <div className="bg-gray-50 p-6 rounded border">
            <h4 className="font-bold mb-4 text-gray-900 text-lg">4. Photo Gallery</h4>
            <CloudinaryUploader label="Add Photos" onUpload={addGalleryImage} />
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mt-4">
              {formData.gallery.map((img: any, i: number) => (
                <div key={i} className="relative group aspect-square">
                  <img src={img.url} className="w-full h-full object-cover rounded border" />
                  <button type="button" onClick={() => removeGalleryImage(i)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">×</button>
                </div>
              ))}
            </div>
         </div>
      </div>

      {/* E. SPECS */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">E. Specs & Launch Info</h3>
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