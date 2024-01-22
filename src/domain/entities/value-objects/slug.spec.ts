import { describe, expect, it } from "vitest";
import { Slug } from "./slug";

describe('Slug value object', () => {
    it('shoud be able to create a new slug from text', () => {
        const slug = Slug.createFromText('example question title')

        expect(slug.value).toEqual('example-question-title')
    })

    it('shoud be able to create a new slug from instance class', () => {
        const slug = new Slug('example-question-title')

        expect(slug.value).toEqual('example-question-title')
    })
})