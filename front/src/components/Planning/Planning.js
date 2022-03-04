// import dependencies
import React, { useEffect, useState } from 'react';
// import function
import planningService from '../../app/features/planningHandling/PlanningService';
// components
import Team from '../Team/Team';
import Calendar from '../Calendar/Calendar';
// styles
import './planning.scss';

const Planning = () => {
  const [membersData, setMembersData] = useState([]);
  const [planningData,setPlanningData] = useState([]);

  useEffect(() => {
    planningService.getTeams().then((res) => setMembersData(res.data));
    planningService.getPlanning().then((res) => {
    res.data.length = 7;
    setPlanningData(res.data); 
    });
  }, []);

  return (
    <div className='planning'>
      <div className='planning__container'>
        <div className='planning__header'>
          {membersData.map((team) => (
            <Team
              key={team.id}
              teamName={team.team}
              teamMembers={team.employees}
            />
          ))}
        </div>

        <div className='planning__calendar'>
            <Calendar planningData={planningData}/>
        </div>
      </div>

    </div>
  );
};

export default Planning;
