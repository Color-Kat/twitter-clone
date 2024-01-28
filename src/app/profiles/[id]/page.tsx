import { Metadata, NextPage, ResolvingMetadata } from 'next';
import { serverClient } from "@/trpc/serverClient";
import { cache } from "react";

export const dynamic = "force-static";

interface Props {
    params: {
        id: string;
    };
    searchParams: string
}

const getProfile = cache(async (id: string) => {
    return await serverClient.profile.getById({
        id
    });
});

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const profile = await getProfile(params.id);

    if(!profile) return {
        title: 'Profile Not Found'
    }

    return {
        title: profile.name,
        description: `Awesome profile of cool person - ${profile.name}`
    }
}

const ProfilePage: NextPage<Props> = async ({params}) => {
    const profile = await getProfile(params.id);

    console.log(profile)

    return (
        <>
            {profile?.name}
        </>
    );
};

export default ProfilePage