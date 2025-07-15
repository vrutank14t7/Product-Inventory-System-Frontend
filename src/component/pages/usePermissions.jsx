import { useSelector } from 'react-redux';

const usePermissions = () => {
    return useSelector((state) => state.permissions.permission);
};

export default usePermissions;
