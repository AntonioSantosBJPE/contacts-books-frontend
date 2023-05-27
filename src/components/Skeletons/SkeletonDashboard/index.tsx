import { Skeleton, Stack } from "@mui/material";
import styles from "./styles.module.scss";
export const SkeletonDashboard = () => {
  return (
    <>
      <div className={styles.container}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={150} animation="pulse" />
          <Skeleton variant="rectangular" height={100} animation="pulse" />
          <Skeleton variant="rectangular" height={400} animation="pulse" />
        </Stack>
      </div>
    </>
  );
};
