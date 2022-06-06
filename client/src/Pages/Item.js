import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';


import IconButton from "@material-ui/core/IconButton";

import List from '@mui/material/List';

export default function Item ({text, remove, update}) {
    const styles = {
        List: {
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }
      };
    return (       
        <div>
        <ListItem>
{text}
            <IconButton onClick={update}> <CreateIcon fontSize="small" /> </IconButton>
            <IconButton  onClick={remove}> <DeleteIcon fontSize="small" /> </IconButton>
            </ListItem>
            </div>
    )
}