import axiosClient from '../../../utils/axios/axiosClient';
import { toast } from 'react-toastify';

/**
 * Function that adds a token from the localStorage to the request headers
 * @returns the JWT token
 */
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { 'x-access-token': user.token };
  } else {
    return;
  }
};

const patchShift = async (shiftData) => {
    try {
        const response = await axiosClient.patch(`/shift/`, shiftData, {
          headers: authHeader(),
        });
        toast.success(`Shift modifié`);
        return response;
      } catch (e) {
        toast.error('Erreur lors de la modification du shift');
        return e.response;
      }
};

const postShift = async (shiftData) => {
    try {
      const response = await axiosClient.post(
        '/shift', 
        shiftData, 
        {
        headers: authHeader(),
      });
      toast.success(`Faction ajoutée`);
      return response;
    } catch (err) {
        toast.error('Erreur lors de la création du shift');
      return err.response;
    }
};

const shiftService = {
    patchShift,
    postShift,
  };
  
  export default shiftService;