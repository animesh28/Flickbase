import React,{ useState, useEffect, useRef } from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { useFormik, FormikProvider, FieldArray } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { formValues, validation } from './validationSchema'
import { addArticles } from '../../../store/actions/article_actions'
import Loader from '../../../utils/loader'

import { 
    TextField, 
    Button, 
    Divider, 
    Chip,
    Paper,
    InputBase,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    Hidden
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import WYSIWYG from '../../../utils/forms/wysiwyg'

const AddArticle = (props) => {
    const [editorBlur, setEditorBlur] = useState(false)

    const inputActor = useRef('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const notifications = useSelector( state => state.notifications )
    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues:formValues,
        validationSchema:validation,
        onSubmit:(values, {resetForm}) => {
            setIsSubmitting(true)
            dispatch(addArticles(values))
        }
    })

    const handleEditorState = (state) => {
        formik.setFieldValue('content', state, true)
    }

    const handleEditorBlur = (blur) => {
        setEditorBlur(true)
    }

    const errorHelper = (formik, values) => {
        return({
            error: formik.errors[values] && formik.touched[values] ? true : false,
            helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
        })
    }

    useEffect(()=> {
        if(notifications && notifications.success) {
            props.history.push('/dashboard/articles')
        }
        if(notifications && notifications.error) {
            setIsSubmitting(false)
        }
    },[notifications, props.history])

    return(
        <AdminLayout section="Add Article">
            {
                !isSubmitting ?
                <form className='mt-3 article_form' onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                        <TextField
                            style={{width:"100%"}}
                            name="title"
                            label="Enter a Title"
                            variant="outlined"
                            {...formik.getFieldProps('title')}
                            {...errorHelper(formik, 'title')}
                        />
                    </div>

                    <div className='form-group'>
                        <WYSIWYG
                            setEditorState={(state) => handleEditorState(state)}
                            setEditorBlur={(blur)=> handleEditorBlur(blur)}
                        />

                        {
                            formik.errors.content && editorBlur ?
                            <FormHelperText error={true}>
                                {formik.errors.content}
                            </FormHelperText>
                            :null
                        }   

                        <TextField
                            style={{visibility:'hidden', display:'none'}}
                            type="hidden"
                            name='content'
                            {...formik.getFieldProps('content')}
                        />
                    </div>

                    <div className='form-group'>
                        <TextField
                            style={{width:"100%"}}
                            name="excerpt"
                            label="Enter a Excerpt"
                            variant="outlined"
                            {...formik.getFieldProps('excerpt')}
                            {...errorHelper(formik, 'excerpt')}
                            multiline
                            rows={4}
                        />
                    </div>

                    <h4>Movie Data and Score</h4>
                    <Divider className='mt-3 mb-3'/>

                    <div className='form-group'>
                        <TextField
                            style={{width:"100%"}}
                            name="score"
                            label="Enter Score"
                            variant="outlined"
                            {...formik.getFieldProps('score')}
                            {...errorHelper(formik, 'score')}
                        />
                    </div>

                    <FormikProvider value={formik}>
                        <h5>Add the Actors</h5>
                        <FieldArray
                            name='actors'
                            render={ arrayhelpers => (
                                <div>
                                    <Paper className='actors_form'>
                                        <InputBase
                                            inputRef={inputActor}
                                            className="input"
                                            placeholder='Add actor name here'
                                        />
                                        <IconButton onClick={
                                            () => {
                                                arrayhelpers.push(inputActor.current.value)
                                                inputActor.current.value = ''
                                            }
                                        }>
                                            <AddIcon/>
                                        </IconButton>
                                    </Paper>

                                    {
                                        formik.errors.actors && formik.touched.actors ?
                                        <FormHelperText error={true}>
                                            {formik.errors.actors}
                                        </FormHelperText>
                                        :null
                                    }

                                    <div className='chip_container'>
                                        {
                                            formik.values.actors.map((actor,index) => (
                                                <div key={index}>
                                                    <Chip
                                                        label={`${actor}`}
                                                        color='primary'
                                                        onDelete={() => arrayhelpers.remove()}
                                                    />
                                                </div>
                                            )) 
                                        }
                                    </div>
                                </div>
                            )}
                        />
                    </FormikProvider>


                    <div className='form-group'>
                        <TextField
                            style={{width:"100%"}}
                            name="director"
                            label="Enter Director"
                            variant="outlined"
                            {...formik.getFieldProps('director')}
                            {...errorHelper(formik, 'director')}
                        />
                    </div>

                    <FormControl variant="outlined">
                        <h6>Select Status</h6>
                        <Select
                            name='status'
                            {...formik.getFieldProps('status')}
                            error={formik.errors.status && formik.touched.status ? true : false}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="public">Public</MenuItem>
                        </Select>
                        {
                            formik.errors.status && formik.touched.status ?
                            <FormHelperText error={true}>
                                {formik.errors.status}
                            </FormHelperText>
                            :null
                        }
                    </FormControl>


                    <Divider className='mt-3 mb-3'/>

                    <Button variant="contained"
                    color="primary"
                    type="submit"
                    disabled={false}
                    >
                        Add Article
                    </Button>
                </form>
                : <Loader/>
            }
        </AdminLayout>
    )
}

export default AddArticle
