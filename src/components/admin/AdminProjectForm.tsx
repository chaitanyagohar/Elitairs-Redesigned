"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "@/app/admin/CloudinaryUploader";

const CONFIG_OPTIONS = ["1 BHK", "2 BHK", "3 BHK","3.5 BHK", "4 BHK", "4.5 BHK", "5+ BHK", "Penthouse", "Villa", "Plot", "SCO"];
const CITY_OPTIONS = ["Gurugram", "New Delhi", "Noida", "Faridabad", "Dwarka"];
const STATUS_OPTIONS = ["New Launch", "Under Construction", "Ready to Move", "Sold Out"];
const TYPE_OPTIONS = ["Residential", "Commercial", "Plots", "Industrial"];

// ✅ 1. Define Common Amenities with Default Placeholder Images
const COMMON_AMENITIES_DATA = [
  { name: "Swimming Pool", defaultImg: "https://images.pexels.com/photos/18167966/pexels-photo-18167966.jpeg" },
  { name: "Gym", defaultImg: "https://images.pexels.com/photos/6046983/pexels-photo-6046983.png" },
  { name: "24/7 Security", defaultImg: "https://images.pexels.com/photos/13051291/pexels-photo-13051291.jpeg" },
  { name: "Power Backup", defaultImg: "https://static.vecteezy.com/system/resources/thumbnails/024/721/212/small/high-tech-equipment-room-with-advanced-machinery-and-computers-generative-ai-photo.jpeg" },
  { name: "Car Parking", defaultImg: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFya2luZ3xlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Kids Play Area", defaultImg: "/kids play area.jpeg" },
  { name: "Club House", defaultImg: "https://images.unsplash.com/photo-1761971976133-5b0cbaee8c89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsdWJob3VzZXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Jogging Track", defaultImg: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Yoga Room", defaultImg: "https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW9nYXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Pet Park", defaultImg: "https://images.unsplash.com/photo-1681392067024-1223e4f3454f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0JTIwcGFya3xlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Senior Citizen Sit Out", defaultImg: "https://images.unsplash.com/photo-1504004030892-d06adf9ffbcf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VuaW9yJTIwY2l0aXplbnN8ZW58MHx8MHx8fDA%3D" },
  { name: "Tennis Court", defaultImg: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVubmlzfGVufDB8fDB8fHww" },
  { name: "Badminton Court", defaultImg: "https://images.unsplash.com/photo-1626721105368-a69248e93b32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFkbWludG9ufGVufDB8fDB8fHww" },
  { name: "Basketball Court", defaultImg: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D" },
  { name: "Library", defaultImg: "https://plus.unsplash.com/premium_photo-1664300897489-fd98eee64faf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Spa & Sauna", defaultImg: "https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNwYXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Mini Theatre", defaultImg: "https://www.paripoornashelters.com/Assests/images/gallery/mini-theatre-inner.jpg" },
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

    // Locality
    connectivity: initialData?.connectivity || [],
    schools: initialData?.schools || [],       
    hospitals: initialData?.hospitals || [],   
    nearbyAmenities: initialData?.nearbyAmenities || [], 
    
    configurations: initialData?.configurations || [],

    // ✅ UPDATED: We use projectAmenities (List of Objects {name, icon}) for everything now
    projectAmenities: initialData?.projectAmenities?.length 
        ? initialData.projectAmenities 
        : initialData?.amenities?.length 
            ? initialData.amenities.map((name: string) => {
                const found = COMMON_AMENITIES_DATA.find(a => a.name === name);
                return { name, icon: found?.defaultImg || "" };
              })
            : [],

    // Visual Assets
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

  // Local state for adding CUSTOM amenity if needed
  const [customAmenityName, setCustomAmenityName] = useState("");
  const [customAmenityImage, setCustomAmenityImage] = useState("");

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

  const toggleConfiguration = (value: string) => {
    setFormData(prev => {
        const current = prev.configurations || [];
        if (current.includes(value)) {
            return { ...prev, configurations: current.filter((c: string) => c !== value) };
        } else {
            return { ...prev, configurations: [...current, value] };
        }
    });
  };

  // ✅ NEW: TOGGLE VISUAL AMENITY (Adds object with background image)
  const toggleAmenity = (amenityName: string, defaultImage: string) => {
    setFormData(prev => {
        const currentList = prev.projectAmenities || [];
        const exists = currentList.find((a: any) => a.name === amenityName);

        if (exists) {
            // Remove it
            return { ...prev, projectAmenities: currentList.filter((a: any) => a.name !== amenityName) };
        } else {
            // Add it with default image
            return { ...prev, projectAmenities: [...currentList, { name: amenityName, icon: defaultImage }] };
        }
    });
  };

  // ✅ NEW: UPDATE IMAGE FOR SPECIFIC AMENITY
  const updateAmenityImage = (amenityName: string, newUrl: string) => {
    setFormData(prev => ({
        ...prev,
        projectAmenities: prev.projectAmenities.map((a: any) => 
            a.name === amenityName ? { ...a, icon: newUrl } : a
        )
    }));
  };

  // Generic Array Handlers
  const addItem = (field: "connectivity" | "schools" | "hospitals" | "nearbyAmenities", value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] as string[]), value] }));
  };
  const removeItem = (field: "connectivity" | "schools" | "hospitals" | "nearbyAmenities", index: number) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] as string[]).filter((_, i) => i !== index) }));
  };

  // Custom Visual Amenity Helpers
  const addCustomAmenity = () => {
    if (!customAmenityName || !customAmenityImage) return alert("Please enter title and upload an image");
    setFormData(prev => ({
      ...prev,
      projectAmenities: [...prev.projectAmenities, { name: customAmenityName, icon: customAmenityImage }]
    }));
    setCustomAmenityName("");
    setCustomAmenityImage("");
  };

  // Media Helpers
  const addGalleryImage = (res: any) => { if (res?.url) setFormData(prev => ({ ...prev, gallery: [...prev.gallery, { url: res.url, alt: "" }] })); };
  const removeGalleryImage = (index: number) => { setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_: any, i: number) => i !== index) })); };

  // ✅ RESTORED: Floor Plan Helpers
  const addFloorPlan = (res: any) => { if (res?.url) setFormData(prev => ({ ...prev, floorPlans: [...prev.floorPlans, { url: res.url, alt: "" }] })); };
  const updateFloorPlanTitle = (index: number, title: string) => { const updated = [...formData.floorPlans]; updated[index].alt = title; setFormData(prev => ({ ...prev, floorPlans: updated })); };
  const removeFloorPlan = (index: number) => { setFormData(prev => ({ ...prev, floorPlans: prev.floorPlans.filter((_: any, i: number) => i !== index) })); };

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
        status: formData.projectStatus,
        // Ensure amenities is synced with projectAmenities names just in case legacy code needs it
        amenities: formData.projectAmenities.map((a: any) => a.name) 
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
                 <option value="Sobha">Sobha</option><option value="Emaar">Emaar</option><option value="Godrej">Godrej</option><option value="Other">Other</option>
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
                        <input type="checkbox" checked={formData.configurations.includes(conf)} onChange={() => toggleConfiguration(conf)} className="w-4 h-4 accent-[#FFC40C]" />
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

      {/* D. VISUAL AMENITIES */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">D. Premium Amenities</h3>
        <div className="bg-gray-50 p-6 rounded border">
            <p className="text-xs text-gray-500 mb-4 uppercase font-bold">Select amenities (Each comes with a background image)</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COMMON_AMENITIES_DATA.map((am) => {
                    const isSelected = formData.projectAmenities.find((a: any) => a.name === am.name);
                    
                    return (
                        <div key={am.name} className={`relative p-3 rounded border transition-all ${isSelected ? "border-[#FFC40C] bg-white shadow-md" : "border-gray-200 bg-gray-50 opacity-75 hover:opacity-100"}`}>
                             
                             <div className="flex items-center justify-between mb-2">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input 
                                        type="checkbox" 
                                        checked={!!isSelected} 
                                        onChange={() => toggleAmenity(am.name, am.defaultImg)} 
                                        className="w-4 h-4 accent-[#FFC40C]" 
                                    />
                                    <span className={`font-bold text-sm ${isSelected ? "text-black" : "text-gray-500"}`}>{am.name}</span>
                                </label>
                             </div>

                             {isSelected && (
                                 <div className="mt-2">
                                     <div className="relative h-24 w-full rounded overflow-hidden mb-2 bg-gray-200 group">
                                         <img src={isSelected.icon} alt={am.name} className="w-full h-full object-cover" />
                                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                             <span className="text-white text-xs font-bold">Preview</span>
                                         </div>
                                     </div>
                                     <div className="flex justify-end">
                                        <CloudinaryUploader 
                                            label="Change Image" 
                                            onUpload={(res) => { if(res?.url) updateAmenityImage(am.name, res.url) }} 
                                            multiple={true}   
                                        />
                                     </div>
                                 </div>
                             )}
                        </div>
                    );
                })}
            </div>

            {/* Custom Amenity Adder */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Add Custom Amenity</h4>
                <div className="flex flex-col sm:flex-row gap-4 items-end bg-white p-4 rounded border">
                    <div className="flex-1 w-full">
                        <label className="text-xs block mb-1 font-bold text-gray-500">Name</label>
                        <input value={customAmenityName} onChange={(e) => setCustomAmenityName(e.target.value)} placeholder="e.g. Golf View" className="w-full border p-2 rounded" />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="text-xs block mb-1 font-bold text-gray-500">Image</label>
                        <CloudinaryUploader multiple={true} label="Upload Image" onUpload={(res) => { if(res?.url) setCustomAmenityImage(res.url) }} />
                    </div>
                    <button type="button" onClick={addCustomAmenity} className="px-6 py-2 bg-black text-white font-bold rounded">Add</button>
                </div>
            </div>
        </div>
      </div>

      {/* E. LOCALITY & SURROUNDINGS */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-6 uppercase tracking-wider">E. Locality & Surroundings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
             <InputList icon="✈️" label="Connectivity" field="connectivity" placeholder="e.g. 5 min to Airport, Near NH-8" />
             <InputList icon="🎓" label="Schools / Colleges" field="schools" placeholder="e.g. DPS (2km), GD Goenka (5km)" />
             <InputList icon="🏥" label="Hospitals" field="hospitals" placeholder="e.g. Medanta (10 mins)" />
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

        {/* ✅ MODIFIED: Intro Video Section */}
        <div className="bg-gray-50 p-4 rounded border mb-6">
            <label className="block text-sm font-bold mb-3">Intro Video</label>
            
            <div className="flex flex-col gap-4">
                {/* Option 1: Upload */}
                <div>
                    <span className="text-xs text-gray-500 font-semibold mb-1 block">Option A: Upload File</span>
                    <CloudinaryUploader 
                        multiple={false} 
                        label="Upload Video File" 
                        accept="video/*" 
                        onUpload={(res) => { if(res?.url) setFormData(prev => ({...prev, videoUrl: res.url})) }} 
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-bold uppercase">OR</span>
                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                </div>

                {/* Option 2: YouTube Link */}
                <div>
                    <span className="text-xs text-gray-500 font-semibold mb-1 block">Option B: YouTube URL</span>
                    <input 
                        type="text" 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        value={formData.videoUrl} 
                        onChange={(e) => setFormData(prev => ({...prev, videoUrl: e.target.value}))}
                        className="w-full border p-2 rounded text-sm focus:border-[#FFC40C] outline-none"
                    />
                </div>
            </div>

            {/* Preview */}
            {formData.videoUrl && (
                <div className="mt-4 p-3 bg-white border border-gray-200 rounded shadow-sm">
                    <p className="text-xs text-gray-500 mb-2 truncate max-w-full"><strong>Source:</strong> {formData.videoUrl}</p>
                    
                    {/* Check if Youtube */}
                    {(formData.videoUrl.includes("youtube.com") || formData.videoUrl.includes("youtu.be")) ? (
                         <div className="aspect-video bg-black rounded overflow-hidden">
                            {(() => {
                                const videoId = formData.videoUrl.split('v=')[1]?.split('&')[0] ?? formData.videoUrl.split('/').pop();
                                return (
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${videoId}`} 
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                )
                            })()}
                         </div>
                    ) : (
                        <video src={formData.videoUrl} controls className="w-full h-40 object-cover rounded bg-black" />
                    )}
                    
                    <button type="button" onClick={() => setFormData(prev => ({...prev, videoUrl: ""}))} className="text-xs text-red-500 font-bold hover:text-red-700 underline mt-2">
                        Remove Video
                    </button>
                </div>
            )}
        </div>

        {/* Cover & Brochure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="bg-gray-50 p-4 rounded border">
              <label className="block text-sm font-bold mb-2">Cover Image (Hero)</label>
              <CloudinaryUploader multiple={true} onUpload={(res) => { if(res?.url) setFormData(prev => ({...prev, coverImage: res.url})) }} />
              {formData.coverImage && <img src={formData.coverImage} className="mt-4 h-40 w-full object-cover rounded shadow-sm" />}
           </div>
           <div className="bg-gray-50 p-4 rounded border">
              <label className="block text-sm font-bold mb-2">Brochure (PDF)</label>
              <CloudinaryUploader multiple={true} label="Upload PDF" accept="application/pdf" onUpload={(res) => { if(res?.url) setFormData(prev => ({...prev, brochureUrl: res.url})) }} />
              {formData.brochureUrl && <p className="text-green-600 mt-2 text-sm">File Uploaded</p>}
           </div>
        </div>
        
        {/* ✅ RESTORED: Floor Plans UI */}
        <div className="bg-gray-50 p-6 rounded border mb-8">
            <h4 className="font-bold mb-4 text-gray-900 text-lg">Floor Plans</h4>
            <CloudinaryUploader multiple={true} label="Add Floor Plans" onUpload={addFloorPlan} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {formData.floorPlans.map((plan: any, i: number) => (
                <div key={i} className="flex gap-4 items-start bg-white p-3 rounded border">
                   <img src={plan.url} className="w-20 h-20 object-cover rounded bg-gray-200" alt="floor plan thumb" />
                   <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 block mb-1">Title</label>
                      <input 
                        placeholder="e.g. 3BHK Layout" 
                        value={plan.alt} 
                        onChange={(e) => updateFloorPlanTitle(i, e.target.value)} 
                        className="w-full border p-1 rounded text-sm"
                      />
                      <button type="button" onClick={() => removeFloorPlan(i)} className="text-red-500 text-xs mt-2 underline">Remove</button>
                   </div>
                </div>
              ))}
            </div>
        </div>

        {/* Gallery */}
         <div className="bg-gray-50 p-6 rounded border">
            <h4 className="font-bold mb-4 text-gray-900 text-lg">Photo Gallery</h4>
            <CloudinaryUploader multiple={true} label="Add Photos" onUpload={addGalleryImage} />
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