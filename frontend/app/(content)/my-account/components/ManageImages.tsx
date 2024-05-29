import React, { useEffect, useState } from "react"
import { IImageMetadata, IPaginator } from "@aapc/types"
import { getImagesByUser } from "@/app/services/image"
import { Nullable } from "@/app/lib/types"
import { useAuth } from "@/app/lib/hooks"
import Paginator from "@/app/components/Paginator"
import ManageImageCard from "@/app/(content)/my-account/components/ManageImageCard"

export default function ManageImages() {
    const { user, token } = useAuth()
    const [imageMetaP, setImageMetaP] = useState<Nullable<IPaginator<IImageMetadata>>>(null)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        if (!user) return
        getImagesByUser(user.username, { page, perPage: 10 }, { token })
            .then(r => {
                if (r.success) setImageMetaP(r.result)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, page])

    return (
        <div>
            <label className={"form-label"}>Uploaded Images</label>
            {imageMetaP &&
                <div className={`mt-1 p-4 bg-blue-100 shadow-inner rounded-2xl
                    bg-opacity-60 hover:bg-opacity-80 transition
                `}>
                    <Paginator paginator={imageMetaP} setPage={setPage}/>
                    <div className={"space-y-3 mt-4"}>
                        {imageMetaP.totalResults > 0
                            ? imageMetaP.data.map(im =>
                                <ManageImageCard key={im.id} image={im}/>
                            )
                            : <p>You have no uploaded images.</p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
