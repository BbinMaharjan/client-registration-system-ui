import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons";
import React from "react";
import { useTable } from "react-table";
import { TableParamsType } from "../../types/commonTypes";
import CustomPagination from "./pagination";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useTheme } from "@emotion/react";
interface TableType {
  data: object[];
  columns: any;
  count?: number | any;
  loading?: string;
  tableInfo?: TableParamsType;
  setTableInfo?: any;
}

const DataTable = React.memo(
  ({ columns, data, count, tableInfo, setTableInfo, loading }: TableType) => {
    const theme: any = useTheme();

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    }: any = useTable({ columns, data });

    const handleSort = (sortBy: string) => {
      tableInfo?.sortOrder === "ASC"
        ? setTableInfo({
            ...tableInfo,
            sorting: sortBy,
            sortOrder: "DESC",
          })
        : setTableInfo({
            ...tableInfo,
            sorting: sortBy,
            sortOrder: "ASC",
          });
    };

    return (
      <Card sx={{ mb: "1rem" }} elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <Box>
            <TableContainer>
              <Table {...getTableProps()}>
                <TableHead>
                  {headerGroups.map((headerGroup: any) => (
                    <TableRow
                      {...headerGroup.getHeaderGroupProps()}
                      sx={{
                        backgroundColor: "#565c65",
                      }}
                    >
                      {headerGroup.headers.map((column: any) => (
                        <TableCell {...column.getHeaderProps()}>
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2px",
                            }}
                          >
                            <Typography
                              fontSize="1rem"
                              color="white"
                              variant="h3"
                            >
                              {column.render("Header")}
                            </Typography>
                            {column?.sortable && (
                              <Box
                                onClick={() => handleSort(column?.id)}
                                style={{
                                  display: "flex",
                                  cursor: "pointer",
                                  marginLeft: "3px",
                                }}
                              >
                                <IconArrowNarrowUp
                                  stroke={1.5}
                                  size="1.3rem"
                                  // color="#b71c1c"
                                />
                                <IconArrowNarrowDown
                                  stroke={1.5}
                                  size="1.3rem"
                                  style={{ marginLeft: "-6px" }}
                                />
                              </Box>
                            )}
                          </Grid>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>

                <TableBody {...getTableBodyProps()}>
                  {loading === "loading" && (
                    <>
                      {headerGroups.map(
                        (headerGroup: any, innerIndex: number) => {
                          return (
                            <TableRow
                              key={`${innerIndex}`}
                              {...headerGroup.getHeaderGroupProps()}
                            >
                              {
                                <>
                                  {headerGroup.headers.map(
                                    (column: any, index: number) => {
                                      return (
                                        <TableCell
                                          key={`${index}${innerIndex}`}
                                        >
                                          <Skeleton
                                            variant="text"
                                            sx={{ fontSize: "2rem" }}
                                          />
                                        </TableCell>
                                      );
                                    }
                                  )}
                                </>
                              }
                            </TableRow>
                          );
                        }
                      )}
                    </>
                  )}

                  {loading === "success" &&
                    rows &&
                    rows.map((row: any, index: number) => {
                      prepareRow(row);
                      return (
                        <TableRow
                          key={row?.original?.id + index || index}
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell: any) => (
                            <TableCell {...cell.getCellProps()}>
                              <Typography variant="body1" color="#212121">
                                {cell.render("Cell")}
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}

                  {loading === "success" && rows && rows.length === 0 && (
                    <TableRow className="border-0">
                      <TableCell colSpan={100} className="border-b-0">
                        <Box
                          sx={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <NotInterestedIcon sx={{ fontSize: "60px" }} />
                            <Typography
                              fontSize="1.4rem"
                              color="#364152"
                              fontWeight="500"
                            >
                              No Data Found
                            </Typography>
                          </Stack>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {data.length > 0 && (
                <CustomPagination
                  component={"div"}
                  count={count}
                  tableInfo={tableInfo}
                  setTableInfo={setTableInfo}
                />
              )}
            </TableContainer>
          </Box>
        </CardContent>
      </Card>
    );
  }
);
export default DataTable;
