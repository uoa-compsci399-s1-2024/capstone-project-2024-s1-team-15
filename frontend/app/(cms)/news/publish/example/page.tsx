"use client"

import React from "react"
import ArticleForm from "@/app/components/ArticleForm"
import { Article, ArticleType } from "@aapc/types"
import ButtonLink from "@/app/components/ButtonLink"

export default function ExampleCreateNewsPage() {
    const exampleArticle = new Article({
        title: "An Example Article",
        subtitle: "This example article shows the capabilities of the rich text editor.",
        content:
            "<h2>Lorem ipsum dolor sit amet</h2><p>Praesent sit amet ligula nec ante facilisis molestie. <strong>Sed tincidunt tortor a malesuada interdum.</strong> In imperdiet dolor at dolor <u>posuere</u>, dictum bibendum lacus ultricies. Curabitur eu neque in nisi tempor luctus a ac sapien. <strong><em>Nulla facilisi.</em></strong></p><blockquote><p>Quisque in dui vitae libero efficitur maximus.</p></blockquote><p>Sed nec nisl in massa <em>consectetur venenatis.</em> Vestibulum in tellus vestibulum, cursus lectus gravida, volutpat tellus.</p><p>Suspendisse potenti. Curabitur neque nulla, fermentum ac arcu eu, interdum mattis ante. Vestibulum vitae ultrices risus. Integer nec interdum neque, imperdiet efficitur urna. Cras enim nulla, cursus in scelerisque sed, mattis sed augue. Ut ante mauris, faucibus id dolor id, volutpat consectetur diam. Morbi gravida turpis at turpis ornare suscipit. Nunc eleifend quam vitae sapien convallis, at rhoncus libero pellentesque. Vestibulum molestie libero tincidunt, tempus mi ut, pretium velit. Donec ac fringilla tellus, imperdiet porttitor urna. Sed egestas ligula orci, vel interdum magna malesuada eu. Nunc ac tincidunt est.</p><h3>Pellentesque auctor elit ligula, at posuere sem lobortis at</h3><p>Maecenas aliquet venenatis nisl a ullamcorper. Maecenas dignissim massa lacus. Mauris euismod odio non risus pharetra suscipit. <em>Cras bibendum, felis ac lacinia egestas, turpis neque sodales leo, et tempus nisl metus et purus. </em></p><ul><li><p>Curabitur vel condimentum orci. </p></li><li><p>Phasellus euismod nisi eu orci egestas dignissim vitae id massa. </p></li><li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p></li></ul><p>In fermentum nibh et ipsum dapibus, <strong><u>quis auctor tortor pellentesque. In hac habitasse platea dictumst.</u></strong> Nunc nibh nisi, consequat ac aliquam vitae, pharetra posuere elit. Duis finibus, purus eget tempor consectetur, urna turpis congue turpis, commodo aliquam quam metus sed elit. Pellentesque sodales faucibus neque et iaculis. Fusce consectetur fermentum nisl, at dictum tortor tristique vel. Curabitur elementum faucibus nisi vitae malesuada.</p><h2>Vestibulum blandit id felis in tincidunt</h2><p>Suspendisse faucibus tempor tortor, sed tempor dolor bibendum tempor. Nulla varius est et ligula iaculis, at ullamcorper nisl porta. <strong>Nulla at tristique lacus. Nunc iaculis iaculis nulla vel lacinia. Quisque dictum nibh et facilisis luctus. Etiam facilisis leo lectus, egestas iaculis ante bibendum at.</strong></p>",
        media: [],
    })

    return (
        <div>
            <h1>Publish a News Article - Example</h1>
            <ButtonLink href={"/news/publish"} text={"Back"} />
            <ArticleForm articleType={ArticleType.news} article={exampleArticle} actionType={"create"} />
        </div>
    )
}
