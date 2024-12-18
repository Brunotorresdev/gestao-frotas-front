import { Skeleton, Stack } from "@mui/material"

export const SkeletonLoading = () => {
    return (<Stack maxWidth={'300px'}>
        <Skeleton variant="rounded" width={'300px'} height={130} />
      </Stack>)
}

export const SkeletonTable = () => {
  return (<Stack >
      <Skeleton variant="rounded" height={300} />
    </Stack>)
}

