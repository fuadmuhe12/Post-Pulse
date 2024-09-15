"use client";
import { CreatePostActions, IsSlugExist } from "@/app/utils/actions";
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
import { ArrowLeft, Atom, Loader2, XCircleIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import React, { useEffect, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useForm } from '@conform-to/react';
import { parseWithZod } from "@conform-to/zod";
import { postSchema } from "@/app/utils/zodSchemas";
import { cn } from "@/lib/utils";
import SubmitButton from "@/components/dashboard/SubmitButton";
type Props = {
    params: {
        siteId: string;
    };
};

export default function CreateAriticlePage({ params }: Props) {
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const [slugExist, setSlugExist] = useState<boolean>(false);
    const [ArticleContent, setArticleContent] = useState<JSONContent | undefined>(undefined);
    const [slugGenerated, setSlugGenerated] = useState<string | undefined>('');
    const [lastState, actions] = useFormState(CreatePostActions, undefined);
    const [isSlugCheckPending, startSlugChecking] = useTransition();
    const [form, fields] = useForm({
        lastResult: lastState,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: postSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: 'onInput',
    });

    const handleGenerateSlug = () => {
        const title = fields.title.value;
        if (!title) {
            toast.error("Please enter a title first");
            return;
        }
        const slug = title.toLowerCase().replace(/\s/g, "-");
        setSlugGenerated(slug);
        toast.success("Slug generated successfully");
    }
    const handleSlugChange = () => {
        startSlugChecking(async () => {
            if (!fields.slug.value) {
                return;
            }
            const doesExist = await IsSlugExist(fields.slug.value);
            setSlugExist(doesExist);
            doesExist && toast.error("Slug already exist");
        }
        )
    };


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
                    <form className="flex flex-col gap-6" action={actions} id={form.id} key={form.key} >
                        <Input type="hidden" name="siteId" value={params.siteId} />
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input placeholder="Article title " className={cn({
                                "focus-visible:ring-red-500": fields.title.errors
                            })} name={fields.title.name} id={fields.title.id} defaultValue={fields.title.initialValue} />
                            <p className="text-red-500 text-sm">{fields.title.errors}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Slug</Label>
                            <Input placeholder="Article slug" value={slugGenerated} onChange={(val) => {
                                const target = val.currentTarget as HTMLInputElement;
                                setSlugGenerated(target.value)
                            }} className={cn({
                                "focus-visible:ring-red-500": fields.slug.errors
                            })} name={fields.slug.name} id={fields.slug.id} defaultValue={fields.slug.initialValue} />
                            {isSlugCheckPending && (<Loader2 className="animate-spin text-gray-500" size={20} />)}
                            <p className="text-red-500 text-sm">{fields.slug.errors || (slugExist && 'slug already exist')}</p>

                            <Button size="sm" variant="outline" className="mt-2 w-fit" type="button" onClick={handleGenerateSlug}>
                                <Atom className="mr-2" /> Generate Slug
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Small Description</Label>
                            <Textarea name={fields.smallDescription.name} id={fields.smallDescription.id} defaultValue={fields.smallDescription.initialValue} placeholder="small descriotion " className={cn({
                                "focus-visible:ring-red-500": fields.smallDescription.errors
                            })} />
                            <p className="text-red-500 text-sm">{fields.smallDescription.errors}</p>
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
                                    <Input type="hidden" name={fields.coverImage.name} id={fields.coverImage.id} defaultValue={fields.coverImage.initialValue} value={imageUrl} className={cn({
                                        "focus-visible:ring-red-500": fields.coverImage.errors
                                    })} />
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
                                    onUploadError={(r) => { toast.error(r.message) }}
                                    onClientUploadComplete={(res) => {
                                        setImageUrl(res[0].url);
                                        toast.success("Image uploaded successfully");
                                    }}
                                />
                            )}
                            <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
                        </div>
                        <div className="flex flex-col gap-2 " >
                            <Label>Article content</Label>
                            <p className="text-xs text-muted-foreground">use &apos;/&apos; go to see the list of available commands</p>
                            <TailwindEditor onUpdate={setArticleContent} initialContent={ArticleContent} ></TailwindEditor>
                            <Input type="hidden" name={fields.postContent.name} id={fields.postContent.id} defaultValue={fields.postContent.initialValue} value={JSON.stringify(ArticleContent)} />
                            <p className="text-red-500 text-sm">{fields.postContent.errors}</p>
                        </div>
                        <p className="text-red-500 text-sm">{form.errors}</p>
                        <div className="flex justify-center">
                            <SubmitButton name="Create Article" onclick={handleSlugChange} />
                        </div>

                    </form>
                </CardContent>
            </Card>
        </>
    );
}

