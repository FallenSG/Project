import { Autocomplete, Chip, TextField } from '@mui/material'

const Genre = ["Urban", "Eastern", "Games", "Fantasy", "Sci-Fi", "Horror", "Sports", "Action", "War", "Realistic", "History", "Mystery", "Drama"];

export default function GenreField({ defaultVal = [], setGenreVal, Req=false }){
    return (
        <Autocomplete
            multiple
            onChange={(e, val) => setGenreVal(val)}
            options={Genre}
            defaultValue={defaultVal}
            filterSelectedOptions
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    required={Req}
                    {...params}
                    helperText="Genre Tags"
                    label="Genre"
                />
            )}
        />
    )
}