/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CategoriesDropdown({
  categoryID,
  setCategoryID,
  categories,
}) {
  const classes = useStyles();
  const [category, setCategory] = React.useState(categoryID);

  const handleChange = (event) => {
    setCategory(event.target.value);
    setCategoryID(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="category">Selecione uma Categoria</InputLabel>
        <Select
          labelId="category"
          id="demo-simple-select-filled"
          value={category}
          onChange={handleChange}
        >
          {categories !== null ? (
            categories.map((eachCat) => (
              <MenuItem key={eachCat.id} value={eachCat.id}>
                {eachCat.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={0}>Sem Categorias...</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
