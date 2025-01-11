/*import { create } from 'kubo-rpc-client';

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = await create({
    url: 'https://ipfs.infura.io:5001/api/v0',
    headers: {
        authorization: auth,
    }
});

export async function uploadToIPFS(file: File): Promise<string> {
    try {
        const added = await client.add(file);
        return `https://ipfs.io/ipfs/${added.path}`;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw error;
    }
}

export async function uploadMetadataToIPFS(metadata: {
    name: string;
    description: string;
    image: string;
    attributes?: Array<{ trait_type: string; value: string }>;
}): Promise<string> {
    try {
        const data = JSON.stringify(metadata);
        const added = await client.add(data);
        return `https://ipfs.io/ipfs/${added.path}`;
    } catch (error) {
        console.error('Error uploading metadata to IPFS:', error);
        throw error;
    }
} */
