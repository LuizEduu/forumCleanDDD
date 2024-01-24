import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"
import dayjs from "dayjs"

interface QuestionProps {
    authorId: UniqueEntityID,
    bestAnswerId?: UniqueEntityID,
    title: string,
    content: string,
    slug: Slug,
    createdAt: Date,
    updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
    static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityID) {
        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            createdAt: new Date()
        }, id)

        return question
    }

    get authorId() {
        return this.props.authorId
    }

    get title() {
        return this.props.title
    }

    get bestAnswerId() {
        return this.props.bestAnswerId
    }

    get content() {
        return this.props.content
    }

    get slug() {
        return this.props.slug
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get isNew(): boolean {
        return dayjs().diff(this.createdAt, 'days') <= 3
    }

    get excerpt() {
        return this.content
          .substring(0, 120)
          .trimEnd()
          .concat('...')
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    set title(title: string) {
        this.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }

    set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
        this.props.bestAnswerId = bestAnswerId
        this.touch()
    }


}