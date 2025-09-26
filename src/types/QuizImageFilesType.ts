interface QuizImageFilesType {
    coverImage: File | null;
    questionImages: Record<string, File | null>;
}

export default QuizImageFilesType;