import { Skeleton, Stack } from "@mui/material"

export const SkeletonLoading = () => {
    return (<Stack maxWidth={'210px'}>
        <Skeleton variant="rounded" width={'210px'} height={111} />
      </Stack>)
}

export const SkeletonTable = () => {
  return (<Stack >
      <Skeleton variant="rounded" height={300} />
    </Stack>)
}

