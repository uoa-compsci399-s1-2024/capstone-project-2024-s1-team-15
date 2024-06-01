"use client"

import React, { useState } from "react"
import Switch from "react-switch"
import { Article, ArticleType } from "@aapc/types"
import { Nullable } from "@/app/lib/types"
import icons from "@/app/lib/icons"
import Button from "@/app/components/Button"
import ExternalArticleForm from "@/app/(cms)/(articles)/components/forms/ExternalArticleForm"
import ArticleForm from "@/app/(cms)/(articles)/components/forms/ArticleForm"

export default function CreateResearchPage() {
    const [exampleArticle, setExampleArticle] = useState<Nullable<Article>>(null)
    const [useExternal, setUseExternal] = useState(false)

    const initializeExampleArticle = () => {
        const ex = new Article({
            title: "An Example Article",
            subtitle: "This example article shows the capabilities of the rich text editor.",
            content:
                "<h2>Lorem ipsum dolor sit amet</h2><p>Praesent sit amet ligula nec ante facilisis molestie. <strong>Sed tincidunt tortor a malesuada interdum.</strong> In imperdiet dolor at dolor <u>posuere</u>, dictum bibendum lacus ultricies. Curabitur eu neque in nisi tempor luctus a ac sapien. <strong><em>Nulla facilisi.</em></strong></p><blockquote><p>Quisque in dui vitae libero efficitur maximus.</p></blockquote><p>Sed nec nisl in massa <em>consectetur venenatis.</em> Vestibulum in tellus vestibulum, cursus lectus gravida, volutpat tellus.</p><p>Suspendisse potenti. Curabitur neque nulla, fermentum ac arcu eu, interdum mattis ante. Vestibulum vitae ultrices risus. Integer nec interdum neque, imperdiet efficitur urna. Cras enim nulla, cursus in scelerisque sed, mattis sed augue. Ut ante mauris, faucibus id dolor id, volutpat consectetur diam. Morbi gravida turpis at turpis ornare suscipit. Nunc eleifend quam vitae sapien convallis, at rhoncus libero pellentesque. Vestibulum molestie libero tincidunt, tempus mi ut, pretium velit. Donec ac fringilla tellus, imperdiet porttitor urna. Sed egestas ligula orci, vel interdum magna malesuada eu. Nunc ac tincidunt est.</p><h3>Pellentesque auctor elit ligula, at posuere sem lobortis at</h3><p>Maecenas aliquet venenatis nisl a ullamcorper. Maecenas dignissim massa lacus. Mauris euismod odio non risus pharetra suscipit. <em>Cras bibendum, felis ac lacinia egestas, turpis neque sodales leo, et tempus nisl metus et purus. </em></p><ul><li><p>Curabitur vel condimentum orci. </p></li><li><p>Phasellus euismod nisi eu orci egestas dignissim vitae id massa. </p></li><li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p></li></ul><p>In fermentum nibh et ipsum dapibus, <strong><u>quis auctor tortor pellentesque. In hac habitasse platea dictumst.</u></strong> Nunc nibh nisi, consequat ac aliquam vitae, pharetra posuere elit. Duis finibus, purus eget tempor consectetur, urna turpis congue turpis, commodo aliquam quam metus sed elit. Pellentesque sodales faucibus neque et iaculis. Fusce consectetur fermentum nisl, at dictum tortor tristique vel. Curabitur elementum faucibus nisi vitae malesuada.</p><h2>Vestibulum blandit id felis in tincidunt</h2><p>Suspendisse faucibus tempor tortor, sed tempor dolor bibendum tempor. Nulla varius est et ligula iaculis, at ullamcorper nisl porta. <strong>Nulla at tristique lacus. Nunc iaculis iaculis nulla vel lacinia. Quisque dictum nibh et facilisis luctus. Etiam facilisis leo lectus, egestas iaculis ante bibendum at.</strong></p>",
            media: [],
        })
        setExampleArticle(ex)
    }

    return (
        <div className={"space-y-6"}>
            <h1 className={"page-title"}>Publish Research Article</h1>
            <div>
                <p className={"form-label"}>Use external article</p>
                <Switch checked={useExternal} onChange={c => setUseExternal(c)}/>
            </div>
            <div className={`space-y-6 ${useExternal? "hidden" : ""}`}>
                {!exampleArticle &&
                    <Button
                        theme={"secondary"}
                        onClick={initializeExampleArticle}
                        text={"Load Example"}
                        icon={icons.wand}
                    />
                }
                <ArticleForm
                    articleType={ArticleType.research}
                    actionType={"publish"}
                    articleJSONString={exampleArticle ? JSON.stringify(exampleArticle) : undefined}
                />
            </div>
            <div className={`space-y-6 ${!useExternal ? "hidden" : ""}`}>
                <ExternalArticleForm
                    articleType={ArticleType.research_external}
                    actionType={"publish"}
                />
            </div>
        </div>
    )
}
