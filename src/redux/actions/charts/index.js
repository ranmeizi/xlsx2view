import * as actionType from '../../constants/charts'

export const set_batch = (set_name,batchs) => ({
    type: actionType.SAVE_BATCHS,
    set_name,batchs
})
