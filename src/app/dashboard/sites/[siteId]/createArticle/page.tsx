"use client";
import { UploadDropzone } from "@/app/utils/uploadthingComponent";
import TailwindEditor from "@/components/dashboard/EditorWrapper";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Atom, XCircleIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
    params: {
        siteId: string;
    };
};

export default function CreateAriticlePage({ params }: Props) {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [ArticleContent, setArticleContent] = useState<JSONContent | undefined>(undefined);
    return (
        <>
            <div className="flex items-center">
                <Button asChild size={"icon"} variant={"outline"} className="mr-3">
                    <Link href={`/dashboard/sites/${params.siteId}`}>
                        <ArrowLeft className="size-4" />
                    </Link>
                </Button>
                <h1 className="text-lg font-semibold">Create Article</h1>
            </div>
            <Card className="w-[420px] lg:w-[620px] mx-auto border-border">
                <CardHeader>
                    <CardTitle>Article Detail</CardTitle>
                    <CardDescription>
                        Fill in the details of the article you want to create.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input placeholder="Article title " />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Slug</Label>
                            <Input placeholder="Article slug" />
                            <Button size="sm" variant="outline" className="mt-2 w-fit" type="button">
                                <Atom className="mr-2" /> Generate Slug
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Small Description</Label>
                            <Textarea placeholder="small descriotion " />
                        </div>
                        <div className="grid gap-2">
                            <Label>Cove Image</Label>
                            {imageUrl ? (
                                <div className="relative size-[200px]">
                                    <Image
                                        src={imageUrl}
                                        alt="uploaded image"
                                        width={200}
                                        height={200}
                                        className="object-cover object-center size-[200px] rounded-lg"
                                    />
                                    <Button
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
                                    onUploadError={(r) => { toast.error(r.message) }}
                                    onClientUploadComplete={(res) => {
                                        setImageUrl(res[0].url);
                                        toast.success("Image uploaded successfully");
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-2 " >
                            <Label>Article content</Label>
                            <p className="text-xs text-muted-foreground">use &apos;/&apos; go to see the list of available commands</p>
                            <TailwindEditor onUpdate={setArticleContent} initialContent={ArticleContent} ></TailwindEditor>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
