import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";


export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector( state => state.ui );

    // Method for opening de modal
    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    // Method for closing the modal
    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    return {

        // Properties
        isDateModalOpen,

        // Dispatch actions
        openDateModal, closeDateModal,
    }

}