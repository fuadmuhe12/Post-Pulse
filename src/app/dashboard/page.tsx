import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ucs2 } from 'punycode';
import React from 'react'
import { GetSiteAndPostData } from '../utils/actions';
import EmptyStateCard from '@/components/dashboard/EmptyStateCard';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DefaultImage from '@public/default.png';

type Props = {}

export default async function DashBoard({ }: Props) {

    const { PostData, siteData } = await GetSiteAndPostData();
    return (
        <div className='flex flex-col flex-1'>
            <h1 className='text-2xl font-semibold mb-5'>
                Your Sites
            </h1>
            {
                siteData.length < 1 || siteData === undefined ? (
                    <EmptyStateCard
                        className='flex flex-grow'
                        buttonHref="/dashboard/sites/newsite"
                        buttonText="Create Site"
                        description="You currently dont have any Sites. Please create some so that you can see them right here!"
                        tittle="You don't have any Sites created"
                    />

                ) :
                    (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                            {siteData.map((site) => {
                                return (
                                    <Card key={site.subdirectory} className="border-border">
                                        <Image
                                            src={site.imageUrl ?? DefaultImage}
                                            alt={site.name}
                                            className="w-full h-[200px] rounded-lg object-cover"
                                            width={400}
                                            height={200}
                                        />
                                        <CardHeader>
                                            <CardTitle className="truncate">{site.name}</CardTitle>
                                            <CardDescription className="line-clamp-3">{site.description}</CardDescription>
                                        </CardHeader>
                                        <CardFooter>
                                            <Button asChild className="w-full">
                                                <Link href={`sites/${site.id}`}>View Articles</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )
            }

            <h1 className='text-2xl font-semibold my-5'>Recent Articles</h1>
            {
                PostData.length < 1 || PostData === undefined ? (
                    <EmptyStateCard
                        buttonHref='/dashboard/sites'
                        buttonText='Create Article'
                        description='You currently dont have any Articles. Please create some so that you can see them right here!'
                        tittle='You dont have any Articles created'
                    />) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                        {PostData.map((post) => {
                            return (
                                <Card key={post.id} className="border-border">
                                    <Image
                                        src={post.image ?? DefaultImage}
                                        alt={post.title}
                                        className="w-full h-[200px] rounded-lg object-cover"
                                        width={400}
                                        height={200}
                                    />
                                    <CardHeader>
                                        <CardTitle className="truncate">{post.title}</CardTitle>
                                        <CardDescription className="line-clamp-3">{post.smallDescription}</CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button asChild className="w-full">
                                            <Link href={`/dashboard/sites/${post.siteId}/${post.id}`}>Edit Articles</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                )}
        </div>
    )
}