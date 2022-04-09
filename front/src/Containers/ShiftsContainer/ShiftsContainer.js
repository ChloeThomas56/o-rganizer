import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import Shifts from '../../components/Shifts/Shifts'
// import { useSelector } from 'react-redux';
import planningService from '../../app/features/planningHandling/PlanningService';

const ShiftsContainer = props => {
    const [planning, setPlanning] = useState();
    const [membersData, setMembersData] = useState([]);
    const [reload, setReload] = useState(1);

    useEffect(() => {
        planningService.getTeams().then((res) => setMembersData(res.data));
        planningService.getPlanning().then((res) => setPlanning(res.data));
      }, [reload]);

      const handleReload = () => {
          setReload(reload +1)
      }
    return (
        <Shifts teamData={membersData} handleReload={handleReload} planning={planning} />
    )
}

ShiftsContainer.propTypes = {}

export default ShiftsContainer