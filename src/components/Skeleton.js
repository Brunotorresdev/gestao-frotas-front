import { Skeleton, Stack } from "@mui/material"

const SkeletonLoading = () => {
    return (<Stack maxWidth={'210px'}>
        <Skeleton variant="rounded" width={'210px'} height={111} />
      </Stack>)
}

export default SkeletonLoading