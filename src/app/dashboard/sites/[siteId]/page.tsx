"use client";
import { DeletePostActions, GetMaxSkip, GetPostData } from "@/app/utils/actions";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Prisma } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    Book,
    Divide,
    FileIcon,
    Loader2,
    MoreHorizontal,
    PlusCircle,
    Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import type { post } from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import prisma from "@/app/utils/db";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import SubmitButton from "@/components/dashboard/SubmitButton";
import { Input } from "@/components/ui/input";

type Props = {
    params: {
        siteId: string;
    };
};

export default function DynamicSite({ params }: Props) {
    async function getPostData(siteId: string, skip: number) {
        const maxSkip = await GetMaxSkip(siteId, 5);
        setMaxSkip(maxSkip);
        const res = await GetPostData(siteId, {
            skip: skip,
            take: 5,
        });
        setPostData(res);
    }
    const [skip, setSkip] = useState(0);
    const [maxSkip, setMaxSkip] = useState(0);
    const [postData, setPostData] = useState<post[]>([]);
    const [isfetching, startFetching] = useTransition();
    useEffect(() => {
        startFetching(() => {
            getPostData(params.siteId, skip);
        });
    }, [params.siteId, skip]);


    return (
        <>
            <div className="flex justify-end gap-4">
                <Button asChild variant={"secondary"}>
                    <Link href={"#"}>
                        <Book className="size-5 mr-2" />
                        View Blog
                    </Link>
                </Button>
                <Button asChild variant={"secondary"}>
                    <Link href={`${params.siteId}/settings`}>
                        <Settings />
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={`${params.siteId}/createArticle`} className="">
                        <PlusCircle className="size-5 mr-2" /> Create Article
                    </Link>
                </Button>
            </div>
            {isfetching && (
                <div className="fixed    z-50 w-screen h-screen flex bg-muted/40">
                    <Loader2 className="animate-spin fixed top-1/2 left-1/2  size-20 text-muted-foreground" />
                </div>
            )}
            {(postData.length === 0 || postData === undefined) && !isfetching ? (
                <div className="flex justify-center flex-1 items-center bg-muted/20 border border-dashed flex-col border-border p-8 pt-0 animate-in fade-in-50 text-center">
                    <div className="size-20 flex justify-center items-center bg-primary/10 rounded-full">
                        <FileIcon className="size-10 text-primary" />
                    </div>
                    <h2 className="mt-6 font-semibold text-xl">
                        You don&apos;t have any Sites created
                    </h2>
                    <p className="mt-2 mb-8 text-muted-foreground max-w-sm mx-auto leading-tight">
                        You currently dont have any Sites. Please create some so that you
                        can see them right here!
                    </p>
                    <Button asChild>
                        <Link href={"sites/newsite"} className="flex">
                            <PlusCircle className="mr-2" /> Create Site
                        </Link>
                    </Button>
                </div>
            ) : (
                <div>
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle>Articles</CardTitle>
                            <CardDescription>
                                {" "}
                                Here are all the articles you have created for this site.{" "}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table className="border-border">
                                <TableHeader>
                                    <TableRow className="border-border">
                                        <TableHead>Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {postData.map((post) => (
                                        <TableRow key={post.id} className="border-border">
                                            <TableCell>
                                                <Image
                                                    src={post.image}
                                                    className="size-16 rounded-md object-cover object-center"
                                                    width={64}
                                                    height={64}
                                                    alt="cover image"
                                                />
                                            </TableCell>
                                            <TableCell>{post.title}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={"outline"}
                                                    className="text-primary border-primary"
                                                >
                                                    Published
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </TableCell>
                                            <TableCell className="text-end">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant={"ghost"}>
                                                            <MoreHorizontal />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            asChild
                                                        ><Link href={`${params.siteId}/${post.id}`}>Edit</Link></DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            asChild>
                                                            <Link href={`${post.siteId}/${post.id}/delete`}>Delete</Link>
                                                        </DropdownMenuItem>

                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination className="flex justify-end">
                                <PaginationContent>
                                    <PaginationPrevious
                                        className={cn('cursor-pointer', { "opacity-50 cursor-none": skip === 0 },)}
                                        onClick={() => {
                                            setSkip((cur) => {
                                                if (cur === 0) {
                                                    return cur;
                                                }
                                                return cur - 1;
                                            });
                                        }}
                                    >
                                        prev
                                    </PaginationPrevious>
                                    <PaginationNext


                                        className={cn('cursor-pointer ', { "opacity-50 cursor-none": maxSkip === skip },)}
                                        onClick={() => {
                                            setSkip((cur) => {
                                                if (cur < maxSkip) {
                                                    return cur + 1;
                                                }
                                                return cur;
                                            });
                                        }}
                                    >
                                        next
                                    </PaginationNext>
                                </PaginationContent>
                            </Pagination>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
