import VocabularyGrid from '@/components/vocabulary/VocabularyGrid';
import { essentialVocabulary } from '@/data/vocabulary';

export default function VocabularyPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            📚 Vocabulary
          </h1>
          <p className="text-xl text-gray-300">
            Learn the 100 most essential Tagalog words with examples and pronunciation
          </p>
        </div>
        
        <VocabularyGrid words={essentialVocabulary} />
      </div>
    </div>
  );
}