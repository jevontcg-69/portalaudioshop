"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
    onUpload: (url: string) => void;
    onRemove: (url: string) => void;
    images: string[];
}

export default function ImageUpload({ onUpload, onRemove, images }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) {
                onUpload(data.secure_url);
            } else {
                alert("Upload failed");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during upload");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
                {images.map((url, index) => (
                    <div key={index} className="relative aspect-square w-32 border border-white/10 group">
                        <img src={url} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                        <button
                            onClick={() => onRemove(url)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}

                <label className="flex flex-col items-center justify-center aspect-square w-32 border border-dashed border-white/20 hover:border-gold/50 cursor-pointer transition-colors bg-surface/5 group">
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold"></div>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-500 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2">Add Image</p>
                        </>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>
            <p className="text-xs text-zinc-500">Recommended size: 1000x1250 (4:5 ratio)</p>
        </div>
    );
}
