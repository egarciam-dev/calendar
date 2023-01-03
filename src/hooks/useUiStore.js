import { useSelector } from "react-redux"


export const useUiStore = () => {

    const { isDateModalOpen } = useSelector( state => state.ui );

    const openDateModal = () => {
        
    }

    return {

        // Something
        isDateModalOpen
    }

}