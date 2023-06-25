import { client } from "../client";
import type {
  ApolloQueryResult, ObservableQuery, WatchQueryOptions, MutationOptions
} from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type LoginError = {
  __typename?: 'LoginError';
  error: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<LoginError>>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  login: LoginResponse;
  register: LoginResponse;
  removePost: Scalars['Boolean']['output'];
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsernameAndPassword;
};


export type MutationRegisterArgs = {
  input: UsernameAndPassword;
};


export type MutationRemovePostArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllPosts: Array<Post>;
  getPostById?: Maybe<Post>;
  me?: Maybe<User>;
};


export type QueryGetPostByIdArgs = {
  id: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UsernameAndPassword = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', user?: { __typename?: 'User', id: number, createdAt: any, username: string } | null, errors?: Array<{ __typename?: 'LoginError', message: string, error: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, createdAt: any } | null };

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginResponse', user?: { __typename?: 'User', id: number, createdAt: any, username: string } | null, errors?: Array<{ __typename?: 'LoginError', message: string, error: string }> | null } };


export const LoginUserDoc = gql`
    mutation loginUser($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    user {
      id
      createdAt
      username
    }
    errors {
      message
      error
    }
  }
}
    `;
export const MeDoc = gql`
    query me {
  me {
    id
    username
    createdAt
  }
}
    `;
export const RegisterUserDoc = gql`
    mutation registerUser($username: String!, $password: String!) {
  register(input: {username: $username, password: $password}) {
    user {
      id
      createdAt
      username
    }
    errors {
      message
      error
    }
  }
}
    `;
export const loginUser = (
  options: Omit<
    MutationOptions<any, LoginUserMutationVariables>,
    "mutation"
  >
) => {
  const m = client.mutate<LoginUserMutation, LoginUserMutationVariables>({
    mutation: LoginUserDoc,
    ...options,
  });
  return m;
}
export const me = (
  options: Omit<
    WatchQueryOptions<MeQueryVariables>,
    "query"
  >
): Readable<
  ApolloQueryResult<MeQuery> & {
    query: ObservableQuery<
      MeQuery,
      MeQueryVariables
    >;
  }
> => {
  const q = client.watchQuery({
    query: MeDoc,
    ...options,
  });
  var result = readable<
    ApolloQueryResult<MeQuery> & {
      query: ObservableQuery<
        MeQuery,
        MeQueryVariables
      >;
    }
  >(
    { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
    (set) => {
      q.subscribe((v: any) => {
        set({ ...v, query: q });
      });
    }
  );
  return result;
}

export const registerUser = (
  options: Omit<
    MutationOptions<any, RegisterUserMutationVariables>,
    "mutation"
  >
) => {
  const m = client.mutate<RegisterUserMutation, RegisterUserMutationVariables>({
    mutation: RegisterUserDoc,
    ...options,
  });
  return m;
}