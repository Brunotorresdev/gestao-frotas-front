import { Skeleton, Stack } from "@mui/material"

export const SkeletonLoading = () => {
    return (<Stack maxWidth={'200px'}>
        <Skeleton variant="rounded" width={'200px'} height={110} />
      </Stack>)
}

export const SkeletonTable = () => {
  return (<Stack >
      <Skeleton variant="rounded" height={300} />
    </Stack>)
}

