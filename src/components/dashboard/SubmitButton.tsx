import React from 'react'
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Props = {
    name: string;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
    onclick?: () => void;

}

export default function SubmitButton({ name, className, variant, onclick }: Props) {
    const { pending } = useFormStatus();
    return (
        <>
            {
                pending ? (
                    <Button disabled variant={variant} type='submit' className={cn('w-fit', className)} >
                        <Loader2 className='size-4 animate-spin mr-2' /> processing...
                    </Button>
                ) : (
                    <Button variant={variant} type='submit' className={cn('w-fit', className)} onClick={() => {
                        onclick && onclick()
                    }}>
                        {name}
                    </Button>
                )
            }
        </>
    )
}