"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "@/app/admin/CloudinaryUploader";

const CONFIG_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4.5 BHK", "5+ BHK", "Penthouse", "Villa", "Plot", "SCO"];
const CITY_OPTIONS = ["Gurugram", "New Delhi", "Noida", "Faridabad", "Dwarka"];
const STATUS_OPTIONS = ["New Launch", "Under Construction", "Ready to Move", "Sold Out"];
const TYPE_OPTIONS = ["Residential", "Commercial", "Plots", "Industrial"];

const COMMON_AMENITIES = [
  "Swimming Pool", "Gym", "24/7 Security", "Power Backup", 
  "Car Parking", "Kids Play Area", "Club House", "Jogging Track", 
  "Yoga Room", "Pet Park", "Senior Citizen Sit Out", "Tennis Court",
  "Badminton Court", "Basketball Court", "Library", "Spa & Sauna"
];

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
    city: initialData?.city || "Gurugram",
    projectStatus: initialData?.status || "New Launch", 
    location: initialData?.location || "",
    rera: initialData?.rera || "",
    
    // Highlights
    landArea: initialData?.landArea || "",
    paymentPlan: initialData?.paymentPlan || "",
    isFeatured: initialData?.isFeatured || false,

    overview: initialData?.overview || "",
    videoUrl: initialData?.videoUrl || "", 
    googleMapUrl: initialData?.googleMapUrl || "",

    // ✅ LOCALITY ARRAYS (Updated)
    connectivity: initialData?.connectivity || [],
    schools: initialData?.schools || [],       // New
    hospitals: initialData?.hospitals || [],   // New
    nearbyAmenities: initialData?.nearbyAmenities || [], // Malls/Business Hubs
    
    amenities: initialData?.amenities || [], 
    configurations: initialData?.configurations || [],

    // Visual Assets
    projectAmenities: initialData?.projectAmenities || [], 
    floorPlans: initialData?.floorplans || [], 
    coverImage: initialData?.coverImage || "",
    brochureUrl: initialData?.brochure || "",
    gallery: initialData?.gallery || [], 
    
    price: initialData?.price || "",
    launchDate: initialData?.launchDate || "",
    totalUnits: initialData?.totalUnits || "",
    area: initialData?.area || "", 
    otherBuilder: "",
  });

  // Local state for Visual Amenity
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityImage, setNewAmenityImage] = useState("");

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const isChecked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({ ...prev, [name]: isChecked }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMapChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = e.target.value;
    const srcMatch = input.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
        setFormData(prev => ({ ...prev, googleMapUrl: srcMatch[1] }));
    } else {
        setFormData(prev => ({ ...prev, googleMapUrl: input }));
    }
  };

  const toggleSelection = (field: "amenities" | "configurations", value: string) => {
    setFormData(prev => {
        const current = prev[field] || [];
        if (current.includes(value)) {
            return { ...prev, [field]: current.filter((c: string) => c !== value) };
        } else {
            return { ...prev, [field]: [...current, value] };
        }
    });
  };

  // ✅ GENERIC ARRAY HANDLER (For Connectivity, Schools, Hospitals, Landmarks)
  const addItem = (field: "connectivity" | "schools" | "hospitals" | "nearbyAmenities", value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] as string[]), value] }));
  };
  const removeItem = (field: "connectivity" | "schools" | "hospitals" | "nearbyAmenities", index: number) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] as string[]).filter((_, i) => i !== index) }));
  };

  // Visual Amenity Helpers
  const addVisualAmenity = () => {
    if (!newAmenityName || !newAmenityImage) return alert("Please enter title and upload an image");
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

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const finalBuilder = formData.builder === "Other" ? formData.otherBuilder : formData.builder;
      const payload = { 
        ...formData, 
        builder: finalBuilder,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        status: formData.projectStatus 
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

  // ✅ REUSABLE INPUT LIST COMPONENT
  const InputList = ({ label, field, placeholder, icon }: { label: string, field: "connectivity" | "schools" | "hospitals" | "nearbyAmenities", placeholder: string, icon: string }) => (
    <div>
      <label className="block text-sm font-bold mb-1 text-gray-700 flex items-center gap-2">
        <span>{icon}</span> {label}
      </label>
      <div className="flex gap-2 mb-2">
        <input id={`input-${field}`} className="flex-1 border p-2 rounded text-sm text-black" placeholder={placeholder} />
        <button type="button" onClick={() => {
          const el = document.getElementById(`input-${field}`) as HTMLInputElement;
          addItem(field, el.value);
          el.value = "";
        }} className="bg-gray-100 px-4 py-2 rounded text-black font-bold hover:bg-[#FFC40C] transition-colors">+</button>
      </div>
      <div className="flex flex-col gap-2">
        {formData[field].map((item: string, i: number) => (
          <div key={i} className="bg-gray-50 border px-3 py-2 text-sm rounded flex items-center justify-between text-gray-700">
            <span>{item}</span>
            <button type="button" onClick={() => removeItem(field, i)} className="text-red-500 font-bold hover:text-red-700">×</button>
          </div>
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
             <label className="block text-sm font-medium mb-1">Slug *</label>
             <input name="slug" value={formData.slug} onChange={handleChange} className="w-full border p-2 rounded text-gray-500" placeholder="Auto-generated" />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">City *</label>
             <select name="city" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded">
                {CITY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Location *</label>
             <input required name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" placeholder="e.g. Sector 150" />
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Builder</label>
             <select name="builder" value={formData.builder} onChange={handleChange} className="w-full border p-2 rounded">
                 <option value="Sobha">Sobha</option><option value="DLF">DLF</option><option value="Godrej">Godrej</option><option value="Other">Other</option>
             </select>
             {formData.builder === "Other" && <input name="otherBuilder" value={formData.otherBuilder} onChange={handleChange} className="w-full border p-2 mt-2 rounded" placeholder="Builder Name"/>}
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">RERA Number</label>
             <input name="rera" value={formData.rera} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>
      </div>
      
      {/* B. CONFIGURATION */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">B. Unit Configuration</h3>
        <div className="bg-gray-50 p-6 rounded border">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {CONFIG_OPTIONS.map((conf) => (
                    <label key={conf} className={`flex items-center gap-2 cursor-pointer p-3 rounded border shadow-sm transition-all ${formData.configurations.includes(conf) ? "bg-yellow-50 border-[#FFC40C]" : "bg-white hover:border-gray-300"}`}>
                        <input type="checkbox" checked={formData.configurations.includes(conf)} onChange={() => toggleSelection("configurations", conf)} className="w-4 h-4 accent-[#FFC40C]" />
                        <span className="text-xs font-bold text-gray-700">{conf}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>

      {/* C. STATUS & HIGHLIGHTS */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">C. Status & Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-yellow-50 p-6 rounded border border-yellow-100">
           <div>
             <label className="block text-sm font-medium mb-1">Status</label>
             <select name="projectStatus" value={formData.projectStatus} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">Type</label>
             <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full border p-2 rounded bg-white">
                {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
             </select>
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">Land Area</label>
             <input name="landArea" value={formData.landArea} onChange={handleChange} className="w-full border p-2 rounded" placeholder="e.g. 12 Acres" />
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">Payment Plan</label>
             <input name="paymentPlan" value={formData.paymentPlan} onChange={handleChange} className="w-full border p-2 rounded" placeholder="e.g. 30:40:30" />
           </div>
           <div className="md:col-span-4 pt-2">
             <label className="flex items-center gap-3 cursor-pointer select-none bg-white p-3 rounded border w-fit shadow-sm hover:border-[#FFC40C]">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 accent-[#FFC40C]" />
                <span className="font-bold text-gray-900">Mark as Featured Project</span>
             </label>
           </div>
        </div>
      </div>

      {/* D. GENERAL AMENITIES (CHECKBOXES) */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">D. General Amenities</h3>
        <div className="bg-gray-50 p-6 rounded border">
            <p className="text-xs text-gray-500 mb-4 uppercase font-bold">Select features included in this project:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {COMMON_AMENITIES.map((am) => (
                    <label key={am} className={`flex items-center gap-2 cursor-pointer p-3 rounded border shadow-sm transition-all ${formData.amenities.includes(am) ? "bg-yellow-50 border-[#FFC40C]" : "bg-white hover:border-gray-300"}`}>
                        <input type="checkbox" checked={formData.amenities.includes(am)} onChange={() => toggleSelection("amenities", am)} className="w-4 h-4 accent-[#FFC40C]" />
                        <span className="text-xs font-bold text-gray-700">{am}</span>
                    </label>
                ))}
            </div>
        </div>
      </div>

      {/* ✅ E. LOCALITY & SURROUNDINGS (UPDATED) */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">E. Locality & Surroundings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {/* Map */}
             <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Google Map Embed Code</label>
                <textarea 
                    name="googleMapUrl" 
                    value={formData.googleMapUrl} 
                    onChange={handleMapChange}
                    className="w-full border p-2 rounded h-24 text-xs font-mono text-gray-600" 
                    placeholder={'<iframe src="..." ...></iframe>'} 
                />
             </div>

             {/* 1. Connectivity */}
             <InputList icon="✈️" label="Connectivity" field="connectivity" placeholder="e.g. 5 min to Airport, Near NH-8" />
             
             {/* 2. Schools */}
             <InputList icon="🎓" label="Schools / Colleges" field="schools" placeholder="e.g. DPS (2km), GD Goenka (5km)" />
             
             {/* 3. Hospitals */}
             <InputList icon="🏥" label="Hospitals" field="hospitals" placeholder="e.g. Medanta (10 mins)" />
             
             {/* 4. Other Landmarks */}
             <InputList icon="🛍️" label="Malls & Business Hubs" field="nearbyAmenities" placeholder="e.g. Cyber City (15 mins)" />
        </div>
      </div>

      {/* F. MEDIA */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">F. Media & Visuals</h3>
        
        {/* Overview & Video */}
        <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Overview Text *</label>
            <textarea required name="overview" value={formData.overview} onChange={handleChange} rows={5} className="w-full border p-2 rounded" />
        </div>
        <div className="bg-gray-50 p-4 rounded border mb-6">
            <label className="block text-sm font-bold mb-2">Intro Video (Upload)</label>
            <CloudinaryUploader label="Upload Video" accept="video/*" onUpload={(res) => { if(res?.url) setFormData(prev => ({...prev, videoUrl: res.url})) }} />
            {formData.videoUrl && (
                <div className="mt-2">
                    <video src={formData.videoUrl} controls className="w-full h-40 object-cover rounded bg-black" />
                    <button type="button" onClick={() => setFormData(prev => ({...prev, videoUrl: ""}))} className="text-xs text-red-500 underline mt-1">Remove</button>
                </div>
            )}
        </div>

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

        {/* Visual Amenities Slider */}
        <div className="bg-gray-50 p-6 rounded border mb-8">
           <h4 className="font-bold mb-4 text-gray-900 text-lg">Visual Amenities (Slider)</h4>
           <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end bg-white p-4 rounded border shadow-sm">
              <div className="flex-1 w-full">
                 <label className="text-xs block mb-1 font-bold text-gray-500 uppercase">Title</label>
                 <input value={newAmenityName} onChange={(e) => setNewAmenityName(e.target.value)} placeholder="e.g. Golf Course View" className="w-full border p-2 rounded" />
              </div>
              <div className="flex-1 w-full">
                 <label className="text-xs block mb-1 font-bold text-gray-500 uppercase">Image</label>
                 <CloudinaryUploader label="Upload Image" onUpload={(res) => { if(res?.url) setNewAmenityImage(res.url) }} />
              </div>
              <button type="button" onClick={addVisualAmenity} className="px-6 py-2 bg-black text-white font-bold rounded">Add</button>
           </div>
           {formData.projectAmenities.length > 0 && (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.projectAmenities.map((am: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded border shadow-sm">
                       <img src={am.icon} className="w-12 h-12 object-cover rounded bg-gray-100" alt={am.name} />
                       <span className="text-sm font-medium">{am.name}</span>
                       <button type="button" onClick={() => removeVisualAmenity(i)} className="ml-auto text-red-500 font-bold">×</button>
                    </div>
                  ))}
               </div>
           )}
        </div>
        
        {/* Gallery */}
         <div className="bg-gray-50 p-6 rounded border">
            <h4 className="font-bold mb-4 text-gray-900 text-lg">Photo Gallery</h4>
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

      {/* G. SPECS */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">G. Specs & Launch Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
           <div><label className="block text-sm font-medium mb-1">Price</label><input name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" /></div>
           <div><label className="block text-sm font-medium mb-1">Launch/Possession</label><input name="launchDate" value={formData.launchDate} onChange={handleChange} className="w-full border p-2 rounded" /></div>
           <div><label className="block text-sm font-medium mb-1">Total Units</label><input name="totalUnits" value={formData.totalUnits} onChange={handleChange} className="w-full border p-2 rounded" /></div>
           <div><label className="block text-sm font-medium mb-1">Area Range</label><input name="area" value={formData.area} onChange={handleChange} className="w-full border p-2 rounded" /></div>
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