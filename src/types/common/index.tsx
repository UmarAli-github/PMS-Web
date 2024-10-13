import { ReactNode } from 'react';

export type PropsWithChildren<P = unknown> = P & { children: ReactNode };

/**
 * Interface representing the properties for a component with optional className.
 */
export interface PropsWithClassName {
  className?: string;
}

/**
 * Interface representing the properties for a component with children and optional className.
 */
export type ReactChildrenWithClassName<P = unknown> = PropsWithChildren<P> &
  PropsWithClassName;

export type SearchParams = Record<string, string | string[] | undefined>;

export type PropsWithSearchParams<P = SearchParams, Q = unknown> = Q & {
  searchParams: P;
};
