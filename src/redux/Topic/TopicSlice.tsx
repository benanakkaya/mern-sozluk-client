import { Topic } from "@/types/TopicType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export const fetchTopicData = createAsyncThunk(
  "topic/get-topic-data",
  async (values: { title: string, page: string }) => {
    const response = await fetch("https://mern-sozluk-backend.onrender.com/topic/get-topic-data", {
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
    const res = await fetch("https://mern-sozluk-backend.onrender.com/opic/random-topic");
    const data = await res.json(); // Veriyi bir kez alıyoruz
    return data; // Alınan veriyi döndürüyoruz
  }
);

export const fetchTopics = createAsyncThunk<any, void>("topic/get-topics", async () => {
    const res = await fetch("https://mern-sozluk-backend.onrender.com/topic/get-recently-topics");
    return await res.json();
  });

interface TopicState {
  currentTopic: Topic;
  currentTopicStatus: string;
  topicList: Topic[];
  topicListStatus: string;
}

const initialState: TopicState = {
  currentTopic: {
    _id: "",
    title: "",
    entries: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
    totalCount: 0,
    totalPages: 0,
  },
  currentTopicStatus: "idle",
  topicList: [],
  topicListStatus: "idle",
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setCurrentTopic: (state, action: PayloadAction<Topic>) => {
      state.currentTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopicData.fulfilled, (state, action) => {
      state.currentTopic = action.payload;
      state.currentTopicStatus = "ready";
    }).addCase(fetchTopicData.pending, (state) => {
      state.currentTopicStatus = "pending";
    });
    builder.addCase(fetchRandomTopic.fulfilled, (state, action) => {
      state.currentTopic = action.payload;
      state.currentTopicStatus = "ready";
    }).addCase(fetchRandomTopic.pending, (state) => {
      state.currentTopicStatus = "pending";
    });
    builder
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topicList = action.payload;
        state.topicListStatus = "ready";
      }).addCase(fetchTopics.pending, (state) => {
        state.topicListStatus = "pending";
      });
  },
});

export const { setCurrentTopic } = topicSlice.actions;

export default topicSlice.reducer;
