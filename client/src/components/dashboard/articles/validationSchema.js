import * as Yup from 'yup'

export const formValues = {
    title:'15 Lorem ipsum dolor sit amet',
    content:'',
    excerpt:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    director:'Lorem ipsum dolor',
    actors:['Lorem ipsum dolor', 'Lorem ipsum dolor', 'Lorem ipsum dolor'],
    score: 81,
    // status:'draft'
}

export const validation = () => (
    Yup.object({
        title: Yup.string()
        .required('Sorry title is required'),
        content: Yup.string()
        .required('Sorry content is required')
        .min(50, "More than 50 words required"),
        excerpt: Yup.string()
        .required('Sorry excerpt is required')
        .max(500,"Max limit for excerpt is 200"),
        director: Yup.string()
        .required('Sorry director is required'),
        actors: Yup.array()
        .required()
        .min(3, 'Minimum of 3 actors required'),
        score: Yup.number()
        .required('Score is required')
        .min(0, '0 is the minimum score')
        .max(100, '100 is the maximum score'),
        status: Yup.string()
        .required('Sorry status is required')
    })
)