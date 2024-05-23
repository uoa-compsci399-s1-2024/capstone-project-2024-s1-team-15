import ICDNService from "@/services/cdn/cdn.service"
import { ImageFormat } from "@aapc/types"
import { promises as fs } from "fs"
import * as fss from "fs"
import StaticRouter from "@/routes/static.router";
import { STATIC_FILE_DIRECTORY } from "@/util/const";
import path from "path";

export default class LocalCDNService implements ICDNService {
    constructor() {
        // Clears local images upon initialization, skips directories
        fss.readdir('src/' + STATIC_FILE_DIRECTORY, (_, files) => {
            for (const file of files) {
                fss.unlink(path.join('src/', STATIC_FILE_DIRECTORY, file), (_) => {
                })
            }
        })
    }

    async putImage(image: Buffer, id: string, imageFormat: ImageFormat): Promise<string> {
        await fs.mkdir(`./src/${STATIC_FILE_DIRECTORY}`, { recursive: true })
        await fs.writeFile(`./src/${STATIC_FILE_DIRECTORY}/${id}.${imageFormat}`, image, { flag: 'w' })

        return `http://localhost:3000${StaticRouter.url}/${id}.${imageFormat}`
    }
}
