// components/TodoCard.js
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  makeStyles,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Proptypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  card: {
    transition: 'transform 0.3s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: `0 0 10px 3px ${theme.palette.primary.main}`,
      transform: 'scale(1.02)',
    },
  },
  deleteButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  editButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const TodoCard = ({ todo, onDeleteTodo, onEditTodo }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const classes = useStyles();

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({ ...todo });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onEditTodo(newTodo);
    handleClose();
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {todo.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{
              whiteSpace: 'normal',
              maxHeight: showFullDescription ? 'none' : '3em',
              overflow: 'hidden',
              justifyContent: 'stretch',
            }}
          >
            {todo.description}
          </Typography>
          {todo.description.length > 100 && (
            <IconButton onClick={handleToggleDescription}>
              {showFullDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteTodo(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancle
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

TodoCard.propTypes = {
  todo: Proptypes.object,
  onDeleteTodo: Proptypes.func,
};

export default TodoCard;
