import React, { useState } from 'react';
import { format } from 'date-fns';
import planningService from '../../app/features/planningHandling/PlanningService';
import { Modal, Select, MenuItem, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import './modals.scss';

const Modals = ({
  open,
  handleClose,
  team,
  date,
  membersData,
  statusData,
  planningData,
  handleReload,
}) => {
  const { handleSubmit, register, reset } = useForm();
  const [selectedItems] = useState([]);
  let dayTeam = null;
  let dayStatus = null;
  const members = membersData.filter((e) => e.team === team);
  const dayData = planningData.find((e) => e.date === date);
  if (dayData) {
    dayTeam = dayData.teams.find((e) => e.team === team);
    if (dayTeam.status) {
      dayStatus = dayTeam.status;
    }
  }

  const handleModalClose = () => {
    reset(
      {},
      {
        keepValues: false,
      }
    );
    handleClose();
  };

  const handleSubmitForm = (data) => {
    for (let key in data) {
      if (defaultValues[key]) {
        if (
          defaultValues[key].id !== Number(data[key]) &&
          Number(data[key]) !== 11
        ) {
          defaultValues[key].id = data[key];
          let commentKey = `comment-${key}`;

          planningService.patchStatus(date, key, data[key], data[commentKey]);
        }

        if (Number(data[key]) === 11) {
          planningService.deleteStatus(date, key);
          delete defaultValues[key];
        }
      } else {
        if (Number(data[key]) !== 11) {
          if (!key.includes('comment')) {
            let commentKey = `comment-${key}`;
            if (!defaultValues[key]) {
              defaultValues[key] = {};
            }
            defaultValues[key].id = data[key];

            planningService.postStatus(date, key, data[key], data[commentKey]);
          }
        }
      }
    }

    handleModalClose();
    handleReload();
  };
  const defaultValues = {};

  const findStatusId = (arr, person) => {
    let foundAffectedStatus;
    if (arr) {
      foundAffectedStatus = arr.find((el) => el.lastName === person.lastName);
    }
    if (foundAffectedStatus) {
      const foundStatus = statusData.find(
        (el) => el.label === foundAffectedStatus.status
      );

      if (foundStatus) {
        defaultValues[person.id] = foundStatus;
        return foundStatus.id;
      }
    }

    return '11';
  };
  const findComment = (arr, person) => {
    let foundAffectedStatus;
    if (arr) {
      foundAffectedStatus = arr.find((el) => el.lastName === person.lastName);
    }

    if (foundAffectedStatus) {
      return foundAffectedStatus.comment;
    }

    return '';
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {date ? (
        <div className='modal__container'>
          <div className='modal__header'>
            <h1 className='modal__team-title'>{team}</h1>
            <p className='modal__team-date'>
              {format(new Date(date), 'dd/MM/yyyy')}
            </p>
          </div>
          <div className='modal__info-container'>
            {members[0].employees &&
              members[0].employees.map((e) => (
                <form
                  key={e.id}
                  className='modal__form'
                  onSubmit={handleSubmit(handleSubmitForm)}
                >
                  <div className='modal__member-container'>
                    <p className='modal__team-member'>
                      {e.firstName} {e.lastName}
                    </p>
                    <Select
                      {...register(`${e.id}`)}
                      sx={{ width: '30%' }}
                      className='modal__select'
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      defaultValue={findStatusId(dayStatus, e)}
                      value={selectedItems[e.id]}
                      label='status'
                    >
                      <MenuItem value='11'>Aucun status</MenuItem>
                      {statusData &&
                        statusData.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.label}
                          </MenuItem>
                        ))}
                    </Select>
                    <TextField
                      {...register(`comment-${e.id}`)}
                      sx={{ width: '30%' }}
                      className='modal__input'
                      id='outlined-basic'
                      label='Commentaire'
                      variant='outlined'
                      defaultValue={findComment(dayStatus, e)}
                    />
                  </div>
                </form>
              ))}
          </div>
          <Button
            sx={{ marginTop: 5, width: 90, margin: '0 auto' }}
            variant='contained'
            onClick={handleSubmit(handleSubmitForm)}
            type='submit'
          >
            Valider
          </Button>
        </div>
      ) : (
        <h1 className='team__title'>modal</h1>
      )}
    </Modal>
  );
};
export default Modals;
