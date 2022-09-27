import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isMine: Scalars['Boolean'];
  payload: Scalars['String'];
  photo: Photo;
  updatedAt: Scalars['String'];
  user: User;
};

export type CreateAccountResult = {
  __typename?: 'CreateAccountResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditProfileResult = {
  __typename?: 'EditProfileResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type FollowUserResult = {
  __typename?: 'FollowUserResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String'];
  hashtag: Scalars['String'];
  id: Scalars['Int'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalPhotos?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  photo: Photo;
  updatedAt: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  read: Scalars['Boolean'];
  room: Room;
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<CreateAccountResult>;
  createComment?: Maybe<MutationResponse>;
  deleteComment: MutationResponse;
  deletePhoto: MutationResponse;
  editComment: MutationResponse;
  editPhoto: MutationResponse;
  editProfile: EditProfileResult;
  followUser?: Maybe<FollowUserResult>;
  login?: Maybe<LoginResult>;
  readMessage: MutationResponse;
  sendMessage: MutationResponse;
  toggleLike?: Maybe<MutationResponse>;
  unfollowUser?: Maybe<UnfollowUserResult>;
  uploadPhoto?: Maybe<Photo>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  payload: Scalars['String'];
  photoId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePhotoArgs = {
  id: Scalars['Int'];
};


export type MutationEditCommentArgs = {
  id: Scalars['Int'];
  payload: Scalars['String'];
};


export type MutationEditPhotoArgs = {
  caption: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationFollowUserArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationReadMessageArgs = {
  id: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  payload: Scalars['String'];
  roomId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationToggleLikeArgs = {
  id: Scalars['Int'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String'];
};


export type MutationUploadPhotoArgs = {
  caption?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
};

export type Photo = {
  __typename?: 'Photo';
  caption?: Maybe<Scalars['String']>;
  commentNumber: Scalars['Int'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['String'];
  file: Scalars['String'];
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  likes: Scalars['Int'];
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  searchHashtags?: Maybe<Array<Maybe<Hashtag>>>;
  searchPhotos?: Maybe<Array<Maybe<Photo>>>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  seeComments: SeeCommentsResult;
  seeFeed?: Maybe<Array<Maybe<Photo>>>;
  seeFollowers: SeeFollowersResult;
  seeFollowing: SeeFollowingResult;
  seeHashtag?: Maybe<Hashtag>;
  seePhoto?: Maybe<Photo>;
  seePhotoComments?: Maybe<Array<Maybe<Comment>>>;
  seePhotoLikes: SeePhotoLikesResult;
  seeProfile?: Maybe<User>;
  seeRecommendPhotos: SeeRecommendPhotosResult;
  seeRecommendUsers: SeeRecommendUsersResult;
  seeRoom?: Maybe<Room>;
  seeRooms?: Maybe<Array<Maybe<Room>>>;
};


export type QuerySearchHashtagsArgs = {
  keyword: Scalars['String'];
  offset: Scalars['Int'];
};


export type QuerySearchPhotosArgs = {
  keyword: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String'];
  offset: Scalars['Int'];
};


export type QuerySeeCommentsArgs = {
  offset?: InputMaybe<Scalars['Int']>;
  photoId: Scalars['Int'];
};


export type QuerySeeFeedArgs = {
  offset: Scalars['Int'];
};


export type QuerySeeFollowersArgs = {
  page: Scalars['Int'];
  username: Scalars['String'];
};


export type QuerySeeFollowingArgs = {
  page: Scalars['Int'];
  username: Scalars['String'];
};


export type QuerySeeHashtagArgs = {
  hashtag: Scalars['String'];
};


export type QuerySeePhotoArgs = {
  id: Scalars['Int'];
};


export type QuerySeePhotoCommentsArgs = {
  id: Scalars['Int'];
  page: Scalars['Int'];
};


export type QuerySeePhotoLikesArgs = {
  photoId: Scalars['Int'];
};


export type QuerySeeProfileArgs = {
  username: Scalars['String'];
};


export type QuerySeeRoomArgs = {
  id: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  messages?: Maybe<Array<Maybe<Message>>>;
  unreadTotal: Scalars['Int'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SeeCommentsResult = {
  __typename?: 'SeeCommentsResult';
  comments?: Maybe<Array<Maybe<Comment>>>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type SeeFollowersResult = {
  __typename?: 'SeeFollowersResult';
  error?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean'];
  total?: Maybe<Scalars['Int']>;
};

export type SeeFollowingResult = {
  __typename?: 'SeeFollowingResult';
  error?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean'];
};

export type SeePhotoLikesResult = {
  __typename?: 'SeePhotoLikesResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SeeRecommendPhotosResult = {
  __typename?: 'SeeRecommendPhotosResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  photos?: Maybe<Array<Maybe<Photo>>>;
};

export type SeeRecommendUsersResult = {
  __typename?: 'SeeRecommendUsersResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  roomUpdates?: Maybe<Message>;
};


export type SubscriptionRoomUpdatesArgs = {
  id: Scalars['Int'];
};

export type UnfollowUserResult = {
  __typename?: 'UnfollowUserResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  isMe: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalFollowers: Scalars['Int'];
  totalFollowing: Scalars['Int'];
  totalPhotos: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};


export type UserPhotosArgs = {
  page: Scalars['Int'];
};

export type CreateAccountMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'CreateAccountResult', ok: boolean, error?: string | null } | null };

export type CreateCommentMutationVariables = Exact<{
  photoId: Scalars['Int'];
  payload: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'MutationResponse', ok: boolean, id?: number | null, error?: string | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'MutationResponse', ok: boolean, id?: number | null } };

export type DeletePhotoMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePhotoMutation = { __typename?: 'Mutation', deletePhoto: { __typename?: 'MutationResponse', ok: boolean, error?: string | null, id?: number | null } };

export type EditCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: Scalars['String'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'MutationResponse', ok: boolean, error?: string | null, id?: number | null } };

export type EditPhotoMutationVariables = Exact<{
  id: Scalars['Int'];
  caption: Scalars['String'];
}>;


export type EditPhotoMutation = { __typename?: 'Mutation', editPhoto: { __typename?: 'MutationResponse', ok: boolean, error?: string | null, id?: number | null } };

export type EditProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  bio?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['Upload']>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileResult', ok: boolean, error?: string | null } };

export type FollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'FollowUserResult', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string } | null } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginResult', ok: boolean, error?: string | null, token?: string | null } | null };

export type ToggleLikeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike?: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } | null };

export type UnfollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: { __typename?: 'UnfollowUserResult', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string } | null } | null };

export type UploadPhotoMutationVariables = Exact<{
  file: Scalars['Upload'];
  caption?: InputMaybe<Scalars['String']>;
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto?: { __typename?: 'Photo', id: number, file: string, likes: number, commentNumber: number, isLiked: boolean, caption?: string | null, createdAt: string, isMine: boolean, user?: { __typename?: 'User', id: number, username: string, avatar?: string | null } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, email: string, avatar?: string | null, bio?: string | null, isMe: boolean } | null };

export type SearchHashtagsQueryVariables = Exact<{
  keyword: Scalars['String'];
  offset: Scalars['Int'];
}>;


export type SearchHashtagsQuery = { __typename?: 'Query', searchHashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos?: number | null } | null> | null };

export type SearchUsersQueryVariables = Exact<{
  keyword: Scalars['String'];
  offset: Scalars['Int'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers?: Array<{ __typename?: 'User', id: number, avatar?: string | null, username: string, firstName: string, lastName?: string | null } | null> | null };

export type SeeCommentsQueryVariables = Exact<{
  photoId: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type SeeCommentsQuery = { __typename?: 'Query', seeComments: { __typename?: 'SeeCommentsResult', ok: boolean, error?: string | null, comments?: Array<{ __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null, isMe: boolean } } | null> | null } };

export type SeeFeedQueryVariables = Exact<{
  offset: Scalars['Int'];
}>;


export type SeeFeedQuery = { __typename?: 'Query', seeFeed?: Array<{ __typename?: 'Photo', caption?: string | null, createdAt: string, isMine: boolean, id: number, file: string, likes: number, commentNumber: number, isLiked: boolean, user?: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, avatar?: string | null } | null, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null> | null } | null> | null };

export type SeeFollowersQueryVariables = Exact<{
  username: Scalars['String'];
  page: Scalars['Int'];
}>;


export type SeeFollowersQuery = { __typename?: 'Query', seeFollowers: { __typename?: 'SeeFollowersResult', ok: boolean, error?: string | null, followers?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type SeeFollowingQueryVariables = Exact<{
  username: Scalars['String'];
  page: Scalars['Int'];
}>;


export type SeeFollowingQuery = { __typename?: 'Query', seeFollowing: { __typename?: 'SeeFollowingResult', ok: boolean, error?: string | null, following?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type SeeHashtagQueryVariables = Exact<{
  hashtag: Scalars['String'];
}>;


export type SeeHashtagQuery = { __typename?: 'Query', seeHashtag?: { __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos?: number | null, photos?: Array<{ __typename?: 'Photo', id: number, file: string, likes: number, caption?: string | null, commentNumber: number, isLiked: boolean, createdAt: string, user?: { __typename?: 'User', firstName: string, lastName?: string | null, username: string, avatar?: string | null } | null } | null> | null } | null };

export type SeePhotoLikesQueryVariables = Exact<{
  photoId: Scalars['Int'];
}>;


export type SeePhotoLikesQuery = { __typename?: 'Query', seePhotoLikes: { __typename?: 'SeePhotoLikesResult', ok: boolean, error?: string | null, users?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type SeeProfileQueryVariables = Exact<{
  username: Scalars['String'];
  page: Scalars['Int'];
}>;


export type SeeProfileQuery = { __typename?: 'Query', seeProfile?: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, bio?: string | null, username: string, avatar?: string | null, totalFollowing: number, totalFollowers: number, totalPhotos: number, isMe: boolean, isFollowing: boolean, photos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, isLiked: boolean, createdAt: string, user?: { __typename?: 'User', id: number, username: string, firstName: string, lastName?: string | null, avatar?: string | null } | null } | null> | null, following?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, avatar?: string | null, isFollowing: boolean } | null> | null, followers?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, avatar?: string | null, isFollowing: boolean } | null> | null } | null };

export type SeeRecommendPhotosQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeRecommendPhotosQuery = { __typename?: 'Query', seeRecommendPhotos: { __typename?: 'SeeRecommendPhotosResult', ok: boolean, error?: string | null, photos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, isMine: boolean, isLiked: boolean, createdAt: string, user?: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, avatar?: string | null } | null, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string } | null> | null, comments?: Array<{ __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null> | null } | null> | null } };

export type SeeRecommendUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeRecommendUsersQuery = { __typename?: 'Query', seeRecommendUsers: { __typename?: 'SeeRecommendUsersResult', ok: boolean, error?: string | null, users?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };


export const CreateAccountDocument = gql`
    mutation CreateAccount($firstName: String!, $lastName: String, $username: String!, $email: String!, $password: String!) {
  createAccount(
    firstName: $firstName
    lastName: $lastName
    username: $username
    email: $email
    password: $password
  ) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
  createComment(photoId: $photoId, payload: $payload) {
    ok
    id
    error
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($id: Int!) {
  deleteComment(id: $id) {
    ok
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePhotoDocument = gql`
    mutation DeletePhoto($id: Int!) {
  deletePhoto(id: $id) {
    ok
    error
    id
  }
}
    `;
export type DeletePhotoMutationFn = Apollo.MutationFunction<DeletePhotoMutation, DeletePhotoMutationVariables>;

/**
 * __useDeletePhotoMutation__
 *
 * To run a mutation, you first call `useDeletePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePhotoMutation, { data, loading, error }] = useDeletePhotoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePhotoMutation(baseOptions?: Apollo.MutationHookOptions<DeletePhotoMutation, DeletePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePhotoMutation, DeletePhotoMutationVariables>(DeletePhotoDocument, options);
      }
export type DeletePhotoMutationHookResult = ReturnType<typeof useDeletePhotoMutation>;
export type DeletePhotoMutationResult = Apollo.MutationResult<DeletePhotoMutation>;
export type DeletePhotoMutationOptions = Apollo.BaseMutationOptions<DeletePhotoMutation, DeletePhotoMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($id: Int!, $payload: String!) {
  editComment(id: $id, payload: $payload) {
    ok
    error
    id
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const EditPhotoDocument = gql`
    mutation EditPhoto($id: Int!, $caption: String!) {
  editPhoto(id: $id, caption: $caption) {
    ok
    error
    id
  }
}
    `;
export type EditPhotoMutationFn = Apollo.MutationFunction<EditPhotoMutation, EditPhotoMutationVariables>;

/**
 * __useEditPhotoMutation__
 *
 * To run a mutation, you first call `useEditPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPhotoMutation, { data, loading, error }] = useEditPhotoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      caption: // value for 'caption'
 *   },
 * });
 */
export function useEditPhotoMutation(baseOptions?: Apollo.MutationHookOptions<EditPhotoMutation, EditPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPhotoMutation, EditPhotoMutationVariables>(EditPhotoDocument, options);
      }
export type EditPhotoMutationHookResult = ReturnType<typeof useEditPhotoMutation>;
export type EditPhotoMutationResult = Apollo.MutationResult<EditPhotoMutation>;
export type EditPhotoMutationOptions = Apollo.BaseMutationOptions<EditPhotoMutation, EditPhotoMutationVariables>;
export const EditProfileDocument = gql`
    mutation editProfile($firstName: String!, $lastName: String, $username: String!, $email: String!, $bio: String, $password: String, $avatar: Upload) {
  editProfile(
    firstName: $firstName
    lastName: $lastName
    username: $username
    email: $email
    bio: $bio
    password: $password
    avatar: $avatar
  ) {
    ok
    error
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      bio: // value for 'bio'
 *      password: // value for 'password'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const FollowUserDocument = gql`
    mutation followUser($username: String!) {
  followUser(username: $username) {
    ok
    error
    user {
      id
      firstName
      lastName
      username
    }
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    error
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ToggleLikeDocument = gql`
    mutation toggleLike($id: Int!) {
  toggleLike(id: $id) {
    ok
    error
  }
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation unfollowUser($username: String!) {
  unfollowUser(username: $username) {
    ok
    error
    user {
      id
      firstName
      lastName
      username
    }
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const UploadPhotoDocument = gql`
    mutation uploadPhoto($file: Upload!, $caption: String) {
  uploadPhoto(file: $file, caption: $caption) {
    id
    file
    likes
    commentNumber
    isLiked
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
  }
}
    `;
export type UploadPhotoMutationFn = Apollo.MutationFunction<UploadPhotoMutation, UploadPhotoMutationVariables>;

/**
 * __useUploadPhotoMutation__
 *
 * To run a mutation, you first call `useUploadPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPhotoMutation, { data, loading, error }] = useUploadPhotoMutation({
 *   variables: {
 *      file: // value for 'file'
 *      caption: // value for 'caption'
 *   },
 * });
 */
export function useUploadPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadPhotoMutation, UploadPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPhotoMutation, UploadPhotoMutationVariables>(UploadPhotoDocument, options);
      }
export type UploadPhotoMutationHookResult = ReturnType<typeof useUploadPhotoMutation>;
export type UploadPhotoMutationResult = Apollo.MutationResult<UploadPhotoMutation>;
export type UploadPhotoMutationOptions = Apollo.BaseMutationOptions<UploadPhotoMutation, UploadPhotoMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    firstName
    lastName
    username
    email
    avatar
    bio
    isMe
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SearchHashtagsDocument = gql`
    query searchHashtags($keyword: String!, $offset: Int!) {
  searchHashtags(keyword: $keyword, offset: $offset) {
    id
    hashtag
    totalPhotos
  }
}
    `;

/**
 * __useSearchHashtagsQuery__
 *
 * To run a query within a React component, call `useSearchHashtagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchHashtagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchHashtagsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchHashtagsQuery(baseOptions: Apollo.QueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchHashtagsQuery, SearchHashtagsQueryVariables>(SearchHashtagsDocument, options);
      }
export function useSearchHashtagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchHashtagsQuery, SearchHashtagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchHashtagsQuery, SearchHashtagsQueryVariables>(SearchHashtagsDocument, options);
        }
export type SearchHashtagsQueryHookResult = ReturnType<typeof useSearchHashtagsQuery>;
export type SearchHashtagsLazyQueryHookResult = ReturnType<typeof useSearchHashtagsLazyQuery>;
export type SearchHashtagsQueryResult = Apollo.QueryResult<SearchHashtagsQuery, SearchHashtagsQueryVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($keyword: String!, $offset: Int!) {
  searchUsers(keyword: $keyword, offset: $offset) {
    id
    avatar
    username
    firstName
    lastName
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const SeeCommentsDocument = gql`
    query SeeComments($photoId: Int!, $offset: Int) {
  seeComments(photoId: $photoId, offset: $offset) {
    ok
    error
    comments {
      id
      payload
      user {
        id
        username
        avatar
        isMe
      }
      isMine
      createdAt
    }
  }
}
    `;

/**
 * __useSeeCommentsQuery__
 *
 * To run a query within a React component, call `useSeeCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCommentsQuery({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSeeCommentsQuery(baseOptions: Apollo.QueryHookOptions<SeeCommentsQuery, SeeCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCommentsQuery, SeeCommentsQueryVariables>(SeeCommentsDocument, options);
      }
export function useSeeCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCommentsQuery, SeeCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCommentsQuery, SeeCommentsQueryVariables>(SeeCommentsDocument, options);
        }
export type SeeCommentsQueryHookResult = ReturnType<typeof useSeeCommentsQuery>;
export type SeeCommentsLazyQueryHookResult = ReturnType<typeof useSeeCommentsLazyQuery>;
export type SeeCommentsQueryResult = Apollo.QueryResult<SeeCommentsQuery, SeeCommentsQueryVariables>;
export const SeeFeedDocument = gql`
    query seeFeed($offset: Int!) {
  seeFeed(offset: $offset) {
    caption
    createdAt
    isMine
    id
    file
    likes
    commentNumber
    isLiked
    user {
      id
      firstName
      lastName
      username
      avatar
    }
    hashtags {
      id
      hashtag
    }
    comments {
      id
      payload
      isMine
      createdAt
      user {
        id
        username
        avatar
      }
    }
  }
}
    `;

/**
 * __useSeeFeedQuery__
 *
 * To run a query within a React component, call `useSeeFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSeeFeedQuery(baseOptions: Apollo.QueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
      }
export function useSeeFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
        }
export type SeeFeedQueryHookResult = ReturnType<typeof useSeeFeedQuery>;
export type SeeFeedLazyQueryHookResult = ReturnType<typeof useSeeFeedLazyQuery>;
export type SeeFeedQueryResult = Apollo.QueryResult<SeeFeedQuery, SeeFeedQueryVariables>;
export const SeeFollowersDocument = gql`
    query SeeFollowers($username: String!, $page: Int!) {
  seeFollowers(username: $username, page: $page) {
    ok
    error
    followers {
      id
      firstName
      lastName
      username
      avatar
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useSeeFollowersQuery__
 *
 * To run a query within a React component, call `useSeeFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFollowersQuery({
 *   variables: {
 *      username: // value for 'username'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSeeFollowersQuery(baseOptions: Apollo.QueryHookOptions<SeeFollowersQuery, SeeFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFollowersQuery, SeeFollowersQueryVariables>(SeeFollowersDocument, options);
      }
export function useSeeFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFollowersQuery, SeeFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFollowersQuery, SeeFollowersQueryVariables>(SeeFollowersDocument, options);
        }
export type SeeFollowersQueryHookResult = ReturnType<typeof useSeeFollowersQuery>;
export type SeeFollowersLazyQueryHookResult = ReturnType<typeof useSeeFollowersLazyQuery>;
export type SeeFollowersQueryResult = Apollo.QueryResult<SeeFollowersQuery, SeeFollowersQueryVariables>;
export const SeeFollowingDocument = gql`
    query SeeFollowing($username: String!, $page: Int!) {
  seeFollowing(username: $username, page: $page) {
    ok
    error
    following {
      id
      firstName
      lastName
      username
      avatar
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useSeeFollowingQuery__
 *
 * To run a query within a React component, call `useSeeFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFollowingQuery({
 *   variables: {
 *      username: // value for 'username'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSeeFollowingQuery(baseOptions: Apollo.QueryHookOptions<SeeFollowingQuery, SeeFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFollowingQuery, SeeFollowingQueryVariables>(SeeFollowingDocument, options);
      }
export function useSeeFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFollowingQuery, SeeFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFollowingQuery, SeeFollowingQueryVariables>(SeeFollowingDocument, options);
        }
export type SeeFollowingQueryHookResult = ReturnType<typeof useSeeFollowingQuery>;
export type SeeFollowingLazyQueryHookResult = ReturnType<typeof useSeeFollowingLazyQuery>;
export type SeeFollowingQueryResult = Apollo.QueryResult<SeeFollowingQuery, SeeFollowingQueryVariables>;
export const SeeHashtagDocument = gql`
    query SeeHashtag($hashtag: String!) {
  seeHashtag(hashtag: $hashtag) {
    id
    hashtag
    photos {
      id
      file
      likes
      caption
      commentNumber
      isLiked
      createdAt
      user {
        firstName
        lastName
        username
        avatar
      }
    }
    totalPhotos
  }
}
    `;

/**
 * __useSeeHashtagQuery__
 *
 * To run a query within a React component, call `useSeeHashtagQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeHashtagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeHashtagQuery({
 *   variables: {
 *      hashtag: // value for 'hashtag'
 *   },
 * });
 */
export function useSeeHashtagQuery(baseOptions: Apollo.QueryHookOptions<SeeHashtagQuery, SeeHashtagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeHashtagQuery, SeeHashtagQueryVariables>(SeeHashtagDocument, options);
      }
export function useSeeHashtagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeHashtagQuery, SeeHashtagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeHashtagQuery, SeeHashtagQueryVariables>(SeeHashtagDocument, options);
        }
export type SeeHashtagQueryHookResult = ReturnType<typeof useSeeHashtagQuery>;
export type SeeHashtagLazyQueryHookResult = ReturnType<typeof useSeeHashtagLazyQuery>;
export type SeeHashtagQueryResult = Apollo.QueryResult<SeeHashtagQuery, SeeHashtagQueryVariables>;
export const SeePhotoLikesDocument = gql`
    query SeePhotoLikes($photoId: Int!) {
  seePhotoLikes(photoId: $photoId) {
    ok
    error
    users {
      id
      firstName
      lastName
      username
      avatar
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useSeePhotoLikesQuery__
 *
 * To run a query within a React component, call `useSeePhotoLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeePhotoLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeePhotoLikesQuery({
 *   variables: {
 *      photoId: // value for 'photoId'
 *   },
 * });
 */
export function useSeePhotoLikesQuery(baseOptions: Apollo.QueryHookOptions<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>(SeePhotoLikesDocument, options);
      }
export function useSeePhotoLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>(SeePhotoLikesDocument, options);
        }
export type SeePhotoLikesQueryHookResult = ReturnType<typeof useSeePhotoLikesQuery>;
export type SeePhotoLikesLazyQueryHookResult = ReturnType<typeof useSeePhotoLikesLazyQuery>;
export type SeePhotoLikesQueryResult = Apollo.QueryResult<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>;
export const SeeProfileDocument = gql`
    query seeProfile($username: String!, $page: Int!) {
  seeProfile(username: $username) {
    id
    firstName
    lastName
    bio
    username
    avatar
    photos(page: $page) {
      id
      file
      caption
      likes
      commentNumber
      isLiked
      createdAt
      user {
        id
        username
        firstName
        lastName
        avatar
      }
    }
    following {
      id
      firstName
      lastName
      username
      avatar
      isFollowing
    }
    followers {
      id
      firstName
      lastName
      username
      avatar
      isFollowing
    }
    totalFollowing
    totalFollowers
    totalPhotos
    isMe
    isFollowing
  }
}
    `;

/**
 * __useSeeProfileQuery__
 *
 * To run a query within a React component, call `useSeeProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSeeProfileQuery(baseOptions: Apollo.QueryHookOptions<SeeProfileQuery, SeeProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeProfileQuery, SeeProfileQueryVariables>(SeeProfileDocument, options);
      }
export function useSeeProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeProfileQuery, SeeProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeProfileQuery, SeeProfileQueryVariables>(SeeProfileDocument, options);
        }
export type SeeProfileQueryHookResult = ReturnType<typeof useSeeProfileQuery>;
export type SeeProfileLazyQueryHookResult = ReturnType<typeof useSeeProfileLazyQuery>;
export type SeeProfileQueryResult = Apollo.QueryResult<SeeProfileQuery, SeeProfileQueryVariables>;
export const SeeRecommendPhotosDocument = gql`
    query SeeRecommendPhotos {
  seeRecommendPhotos {
    ok
    error
    photos {
      id
      file
      caption
      likes
      commentNumber
      isMine
      isLiked
      createdAt
      user {
        id
        firstName
        lastName
        username
        avatar
      }
      hashtags {
        id
        hashtag
      }
      comments {
        id
        payload
        isMine
        createdAt
        user {
          id
          username
          avatar
        }
      }
    }
  }
}
    `;

/**
 * __useSeeRecommendPhotosQuery__
 *
 * To run a query within a React component, call `useSeeRecommendPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRecommendPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRecommendPhotosQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeRecommendPhotosQuery(baseOptions?: Apollo.QueryHookOptions<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>(SeeRecommendPhotosDocument, options);
      }
export function useSeeRecommendPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>(SeeRecommendPhotosDocument, options);
        }
export type SeeRecommendPhotosQueryHookResult = ReturnType<typeof useSeeRecommendPhotosQuery>;
export type SeeRecommendPhotosLazyQueryHookResult = ReturnType<typeof useSeeRecommendPhotosLazyQuery>;
export type SeeRecommendPhotosQueryResult = Apollo.QueryResult<SeeRecommendPhotosQuery, SeeRecommendPhotosQueryVariables>;
export const SeeRecommendUsersDocument = gql`
    query SeeRecommendUsers {
  seeRecommendUsers {
    ok
    error
    users {
      id
      firstName
      lastName
      username
      avatar
      isFollowing
      isMe
    }
  }
}
    `;

/**
 * __useSeeRecommendUsersQuery__
 *
 * To run a query within a React component, call `useSeeRecommendUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRecommendUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRecommendUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeRecommendUsersQuery(baseOptions?: Apollo.QueryHookOptions<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>(SeeRecommendUsersDocument, options);
      }
export function useSeeRecommendUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>(SeeRecommendUsersDocument, options);
        }
export type SeeRecommendUsersQueryHookResult = ReturnType<typeof useSeeRecommendUsersQuery>;
export type SeeRecommendUsersLazyQueryHookResult = ReturnType<typeof useSeeRecommendUsersLazyQuery>;
export type SeeRecommendUsersQueryResult = Apollo.QueryResult<SeeRecommendUsersQuery, SeeRecommendUsersQueryVariables>;