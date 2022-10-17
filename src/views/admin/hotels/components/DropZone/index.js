import { useState } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'

export default function DropZone({ setImgGallery }) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = (files) => {
        for (const file of files) {
            let reader = new FileReader();
            reader.onloadend = function () {
                // console.log('RESULT', reader.result)
                setImgGallery(prev => [...prev, reader.result])
            }
            reader.readAsDataURL(file)
        }
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <>
            <DropzoneDialog
                open={open}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                filesLimit={8}
                maxFileSize={5000000}
                onClose={handleClose}
                submitButtonText="Upload"
            />
            <Button variant='outlined' className='mb-2' onClick={handleOpen}>
                Click Here to Upload Images
            </Button>
        </>
    )
}

