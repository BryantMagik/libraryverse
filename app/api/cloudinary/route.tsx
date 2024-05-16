import cloudinaryLib from 'cloudinary'

const cloudinary = cloudinaryLib.v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,

  })


export async function POST(request: Request) {
    const body = (await request.json()) as { paramsToSign: Record<string, string> }
    const { paramsToSign } = body

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string)

    return Response.json({ signature })

}