import { Paper, Button } from '@mui/material';

export default function ImgPreview({ imgFile, setImgFile }){
    return (
        <>
            <Paper sx={{ width: "fit-content", mb: "16px", p: 0 }}>
                <img
                    style={{
                        height: "35vh",
                        aspectRatio: "0.8",
                        resize: "auto",
                        objectFit: "scale-down"
                    }}
                    src={imgFile.shown}
                />
            </Paper>

            <Button
                variant="contained"
                component="label"
                sx={{ width: "fit-content" }}
            >
                Upload Book Cover
                <input
                    name="bookCover"
                    onChange={(e) => {
                        setImgFile({ shown: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] })
                    }}
                    type="file"
                    hidden
                />
            </Button>
        </> 
    )
}