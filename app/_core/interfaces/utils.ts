import { useEffect, useState } from 'react';

export interface QueryParams {
  page: number,
  limit: number,
  search: string | undefined,
  sortOrder: string
}