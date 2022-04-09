import { format, getISOWeek } from 'date-fns';

import React, { useRef, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import './calendarRow.scss';
import Hover from '../Hover/Hover';

const CalendarRow = ({ date, teams, handleModal }) => {
  const [isShown, setIsShown] = useState(false);
  const [currentStatus, setCurrentStatus] = useState();
  const [position, setPosition] = useState();

  const shiftRef = useRef();
  const today = format(new Date(), 'yyyy-MM-dd');
  const displayDay = format(new Date(today), 'yyyy-MM-dd');

  useEffect(() => {
    if (date === displayDay) {
      shiftRef.current.scrollIntoView();
    }
    // eslint-disable-next-line
  }, []);

  const onHover = (event, status) => {
    setCurrentStatus(status);
    setIsShown(true);
    const leftPosition =
      event.target.offsetLeft + event.target.offsetParent.offsetLeft - 210;
      setPosition(leftPosition);
  };

  const offHover = () => {
    setIsShown(false);
  };

  return (
    <div ref={shiftRef} className='shift'>
      {isShown && (
        <Hover
          status={currentStatus}
          style={{
            left: position + 'px',
          }}
        />
      )}
      <div className='shift__date'>
        <span className='shift__week'>S {getISOWeek(new Date(date))} - </span>
        {format(new Date(date), 'dd/MM/yyyy')}
      </div>
      {teams.map((team) => (
        <div className='shift__team' key={team.teamId}>
          <div
            className={`shift__period shift__period${team.shift}`}
            onClick={() => handleModal(date, team)}
          >
            {team.shift}
            {team.status && (
              <div
                className={`shift__event shift__event${team.shift}`}
                onMouseEnter={(event) => onHover(event, team.status)}
                onMouseLeave={offHover}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

CalendarRow.propTypes = {
  date: PropTypes.string.isRequired,
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      teamId: PropTypes.number.isRequired,
      team: PropTypes.string.isRequired,
      shift: PropTypes.string,
      status: PropTypes.arrayOf(
        PropTypes.shape({
          statusId: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired,
        }).isRequired
      ),
    }).isRequired
  ).isRequired,
};

CalendarRow.defaultProps = {
  shift: '',
  status: null,
};

export default CalendarRow;
