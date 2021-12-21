import React, { useEffect } from 'react'
import AdminLayout from '../../../hoc/adminLayout'

import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl
} from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPaginateArticles } from '../../../store/actions/article_actions'
import PaginationComponent from './paginate'

const Article = () => {
    const dispatch = useDispatch()
    const articles = useSelector(state => state.articles)
    let arts = articles.adminArticles

    useEffect(() => {
        dispatch(getPaginateArticles())
    },[dispatch])

    const goToPrevPage = (page) => {
        dispatch(getPaginateArticles(page))
    }

    const goToNextPage = (page) => {
        dispatch(getPaginateArticles(page))
    }

    return(
        <AdminLayout section="Articles">
            <div className='articles_table'>
                <ButtonToolbar className='mb-3'>
                    <ButtonGroup className='mr-2'>
                        <LinkContainer to='/dashboard/articles/add'>
                            <Button variant='secondary'>Add Articles</Button>
                        </LinkContainer>
                    </ButtonGroup>
                    <form onSubmit={() => alert('search')}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='btnGroupAddon2'>@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type='text'
                                placeholder='Example'
                            />
                        </InputGroup>
                    </form>
                </ButtonToolbar>

                <PaginationComponent
                    arts={arts}
                    prev={(page) => goToPrevPage(page)}
                    next={(page) => goToNextPage(page)}
                />
            </div>
        </AdminLayout>
    )
}

export default Article