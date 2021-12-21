import React from "react"
import { Table, Pagination } from 'react-bootstrap'
import Moment from 'react-moment'
import Loader from "../../../utils/loader"

const PaginationComponent = ({arts,prev,next}) => {

    const goToPrev = (page) => {
        prev(page)
    }

    const goToNext = (page) => {
        next(page)
    }

    return(
        <>
            {
                arts && arts.docs ?
                <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Created</th>
                            <th>Title</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arts.docs.map((item) => (
                                <tr key={item._id}>
                                    <td><Moment to={item.createdAt}></Moment></td>
                                    <td>{item.title}</td>
                                    <td>{item.score}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Pagination>
                    {
                        arts.hasPrevPage ?
                        <>
                            <Pagination.Prev onClick={()=>goToPrev(arts.prevPage)} />
                            <Pagination.Item onClick={()=>goToPrev(arts.prevPage)}>
                                {arts.prevPage}
                            </Pagination.Item>
                        </>
                        : null
                    }
                    <Pagination.Item active>{arts.page}</Pagination.Item>
                    {
                        arts.hasNextPage ?
                        <>
                            <Pagination.Item onClick={()=>goToNext(arts.nextPage)}>
                                {arts.nextPage}
                            </Pagination.Item>
                            <Pagination.Next onClick={()=>goToNext(arts.nextPage)} />
                        </>
                        : null
                    }
                </Pagination>
                </>
                : <Loader/>
            }
        </>
    )
}

export default PaginationComponent