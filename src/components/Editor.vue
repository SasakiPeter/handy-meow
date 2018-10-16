<template>
	<div class="editor">
		<h2>Markdown</h2>
		<v-layout row>
			<v-flex xs2>
				<div class="memoListWrapper">
					<v-layout row justify-center>
						<v-flex>
							<button class="addMemoBtn" @click="addMemo">
								<i class="material-icons">
									note_add
								</i>
							</button>
						</v-flex>
						<v-flex>
							<button class="deleteMemoBtn" v-if="memos.length > 1" @click="deleteMemo">
								<i class="material-icons">
									delete
								</i>
							</button>
						</v-flex>
						<v-flex>
							<button class="saveMemosBtn" @click="saveMemos">
								<i class="material-icons">
									save
								</i>
							</button>
						</v-flex>
					</v-layout>
					<!-- :はv-bindの省略記法で、属性を付与している -->
					<!-- reactでmap使ったときみたいにv-forで展開したときは、それぞれの要素にkeyを持たせたほうがいい -->
					<!-- というより、そうしないと並び替え機能は実装できない -->
					<div class="memoList" v-for="(memo,index) in memos" :key="index" @click="selectMemo(index)" :data-selected="index==selectedIndex">
						<p class="memoTitle">{{displayTitle(memo.markdown)}}</p>
					</div>
				</div>
			</v-flex>

			<!-- v-modelを使用すると、data関数に自動的にデータを代入できる -->
			<!-- これをデータバインディングと言う -->
			<v-flex xs5>
				<textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
			</v-flex>

			<!-- <div class="preview_test" >{{markdown}}</v-layout> -->
			<!-- v-htmlは指定された値を直接htmlとして描画する -->
			<!-- preview()で帰ってくる値はhtmlタグ -->
			<v-flex xs5>
				<div class="preview markdown-body" v-html="preview()"></div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import marked from 'marked';
import { db } from '../main';

export default {
	props: ['user'],
	data() {
		return {
			memos: [
				{
					markdown: ''
				}
			],
			selectedIndex: 0
		};
	},
	created: function() {
		db.collection('memos')
			.doc(this.user.uid)
			.get()
			.then(doc => {
				if (doc.exists && doc.data().memos) {
					this.memos = doc.data().memos;
				}
			});
	},
	mounted: function() {
		document.onkeydown = e => {
			if (
				e.key == 's' &&
				((e.metaKey && !e.ctrlKey) || (!e.metaKey && e.ctrlKey))
			) {
				this.saveMemos();
				// ここのreturn falseを侮るなかれ！ これがないと、ウェブページを保存するか聞かれてしまう
				return false;
			}
		};
	},
	beforeDestroy: function() {
		document.onkeydown = null;
	},
	methods: {
		addMemo: function() {
			this.memos.push({ markdown: '無題のメモ' });
		},
		deleteMemo: function() {
			this.memos.splice(this.selectedIndex, 1);
			if (this.selectedIndex > 0) {
				this.selectedIndex--;
			}
		},
		selectMemo: function(index) {
			this.selectedIndex = index;
		},
		saveMemos: function() {
			db.collection('memos')
				.doc(this.user.uid)
				.set({ memos: this.memos });
		},
		preview: function() {
			return marked(this.memos[this.selectedIndex].markdown);
		},
		// split(/\n/)はテキストを改行で分割し、配列にするメソッド
		displayTitle: function(text) {
			return text.split(/\n/)[0];
		}
	}
};
</script>

<style scoped>
textarea {
	width: 100%;
	height: 80vh;
}
</style>
