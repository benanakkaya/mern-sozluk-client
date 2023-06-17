import { TopicType } from "@/types/TopicType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export const fetchTopicData = createAsyncThunk(
  "topic/get-topic-data",
  async (values: { title: string, page: string }) => {
    const response = await fetch("http://localhost:5000/topic/get-topic-data", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        page: values.page,
      }),
    });
    
    const data = await response.json();
    return data;
  }
);


export const fetchRandomTopic = createAsyncThunk(
  "topic/get-random-topic",
  async () => {
    const res = await fetch("http://localhost:5000/topic/random-topic");
    const data = await res.json(); // Veriyi bir kez alıyoruz
    return data; // Alınan veriyi döndürüyoruz
  }
);

export const fetchTopics = createAsyncThunk<any, void>("topic/get-topics", async () => {
    const res = await fetch("http://localhost:5000/topic/get-recently-topics");
    return await res.json();
  });

interface TopicState {
  currentTopic: any;
  currentTopicStatus: string;
  topicList: TopicType[];
  topicListStatus: string;
}

const initialState: TopicState = {
  currentTopic: {},
  currentTopicStatus: "idle",
  topicList: [],
  topicListStatus: "idle",
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setCurrentTopic: (state, action: PayloadAction<any[]>) => {
      state.currentTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopicData.fulfilled, (state, action) => {
      state.currentTopic = action.payload;
      state.currentTopicStatus = "ready";
    }).addCase(fetchTopicData.pending, (state,action) => {
      state.currentTopicStatus = "pending";
    });
    builder.addCase(fetchRandomTopic.fulfilled, (state, action) => {
      state.currentTopic = action.payload;
      state.currentTopicStatus = "ready";
    }).addCase(fetchRandomTopic.pending, (state,action) => {
      state.currentTopicStatus = "pending";
    });
    builder
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topicList = action.payload;
        state.topicListStatus = "ready";
      }).addCase(fetchTopics.pending, (state, action) => {
        state.topicListStatus = "pending";
      });
  },
});

export const { setCurrentTopic } = topicSlice.actions;

export default topicSlice.reducer;
