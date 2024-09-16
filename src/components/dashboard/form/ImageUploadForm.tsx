"use client";
import { UploadDropzone } from "@/app/utils/uploadthingComponent";
import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UpdateSiteImageAction } from "@/app/utils/actions";
import { useFormState } from "react-dom";
import { useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteImageUploadSchema } from "@/app/utils/zodSchemas";

type Props = {
    siteId: string;
    currentImageUrl?: string;
};

export default function ImageUploadForm({ siteId, currentImageUrl }: Props) {
    const [imageUrl, setImageUrl] = useState<string | undefined>(currentImageUrl);
    const [lastState, actions] = useFormState(UpdateSiteImageAction, undefined);
    const [form, fields,] = useForm({
        lastResult: lastState,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: siteImageUploadSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: 'onInput',
    });


    useEffect(() => {
        if (lastState?.status === 'success') {
            toast.success("Image changed successfully");
        }
        if (
            lastState?.status === 'error'
        ) {
            toast.error("Failed to change image");
        }
    }, [lastState?.status])

    const { value: imageUrlValue, change } = useInputControl(fields.imageUrl)
    return (
        <>
            {imageUrl ? (
                <div className="relative size-[200px]">
                    <Image
                        src={imageUrl}
                        alt="cover image"
                        className="rounded-md object-cover object-center"
                        width={200}
                        height={200}
                    />
                    <Button
                        asChild
                        size="icon"
                        variant="link"
                        className="absolute top-0 right-0"
                        type="button"
                        onClick={() => confirm("Are you sure you want to delete this image?") && (() => {
                            setImageUrl(undefined);
                            toast.success("Image removed successfully");
                        })()}
                    ><XIcon className="text-red-300 hover:text-red-600" /></Button>
                </div>
            ) : (
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setImageUrl(res[0].url);
                        toast.success("Image uploaded successfully");
                        change(res[0].url);
                    }}
                    onUploadError={(err) => {
                        toast.error(err.message);
                    }}
                />
            )}
            <p className="text-red-500 text-sm">{fields.imageUrl.errors}</p>

            <form action={actions} key={form.key} id={form.id} name={form.name} className="mt-8">
                <Input type="hidden" name={fields.imageUrl.name} id={fields.imageUrl.id} value={imageUrl !== currentImageUrl ? imageUrl : ''} />
                <Input type="hidden" name="siteId" id="siteId" value={siteId} />
                <SubmitButton name="Update Image" />
            </form>
        </>
    );
}
