import {
  AfterContentInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { blogDataService } from '../shared/blogData.service';
import { blogDataInterface } from '../blogTemplate/blogTemplate.component';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blogDetails.component.html',
  styleUrls: ['./blogDetails.component.scss'],
})
export class blogDetailsComponent implements OnInit {
  currentBlogId: number | any;
  currentBlog: blogDataInterface | any = {
    content_text:
      'Wear safe arrive mother magazine.\nGround wife treatment from\nWoman future paper situation before manager. Expert instead traditional religious interview trip. Woman future paper situation before manager. Expert instead traditional religious interview trip. Woman future paper situation before manager. Expert instead traditional religious interview trip.\nDirection indeed organization why weight. Speech statement behind return. Direction indeed organization why weight. Speech statement behind return. Direction indeed organization why weight. Speech statement behind return.\nAttack interview new all. Ago action wait response tend hour. Attack interview new all. Ago action wait response tend hour. Attack interview new all. Ago action wait response tend hour.\nDuring final mouth strong late learn. Plant though push share response. Offer many with position. Mr job kitchen choice better.\nTheir whose test seek huge with job\nCreate water current kind hit approach first. Star music whose our beautiful not enough. Create water current kind hit approach first. Star music whose our beautiful not enough. Create water current kind hit approach first. Star music whose our beautiful not enough.\nStudent reason since drug couple. Meeting item care summer final fight. Student reason since drug couple. Meeting item care summer final fight. Student reason since drug couple. Meeting item care summer final fight.\nCup box above sort college professional hand. Cup box above sort college professional hand. Cup box above sort college professional hand.\nRadio report less around. During board believe big section. Writer production song activity although skin toward. Head board trial.\nSummer pattern often need modern eat\nBut continue fact worker sing total save continue. No hour raise approach lose. Question benefit play story floor low. But continue fact worker sing total save continue. No hour raise approach lose. Question benefit play story floor low. But continue fact worker sing total save continue. No hour raise approach lose. Question benefit play story floor low.\nChance share man. Fine develop price scene reveal watch something bit. Chance share man. Fine develop price scene reveal watch something bit. Chance share man. Fine develop price scene reveal watch something bit.\nReveal see too entire Mrs identify. Coach trip everyone collection movement less run. Industry field finish finish. Reveal see too entire Mrs identify. Coach trip everyone collection movement less run. Industry field finish finish. Reveal see too entire Mrs identify. Coach trip everyone collection movement less run. Industry field finish finish.\nHope trial him could left speak. Prove to drop full group. Practice heart spend system recent.\nReveal position voice baby cup catch anyone\nImagine plant tend but recently enjoy. Its fact point live. Prepare family side participant interesting minute. Imagine plant tend but recently enjoy. Its fact point live. Prepare family side participant interesting minute. Imagine plant tend but recently enjoy. Its fact point live. Prepare family side participant interesting minute.\nStation toward return. Much method however anything. Station toward return. Much method however anything. Station toward return. Much method however anything.\nDrive small among. Reality market process let also glass through. Notice matter executive discussion condition. Drive small among. Reality market process let also glass through. Notice matter executive discussion condition. Drive small among. Reality market process let also glass through. Notice matter executive discussion condition.\nBrother difference course series education. Create television picture black. Future partner bank never interesting.\nOld seem minute how\nRisk during grow situation federal minute. Organization wide friend bring arm. Risk during grow situation federal minute. Organization wide friend bring arm. Risk during grow situation federal minute. Organization wide friend bring arm.\nTo home everything both morning her. Value yes role itself myself anyone. To home everything both morning her. Value yes role itself myself anyone. To home everything both morning her. Value yes role itself myself anyone.\n',
    user_id: 7,
    title: 'Civil field respond drop.',
    photo_url: 'https://api.slingacademy.com/public/sample-blog-posts/2.png',
    created_at: '2023-03-16T19:06:12.184273',
    id: 2,
    description: 'Her pick central forget single likely.',
    content_html:
      '<p>Wear safe arrive mother magazine.</p><h2>Away president soldier</h2><p>Woman future paper situation before manager. Expert instead traditional religious interview trip. Woman future paper situation before manager. Expert instead traditional religious interview trip. Woman future paper situation before manager. Expert instead traditional religious interview trip.</p><p>Direction indeed organization why weight. Speech statement behind return. Direction indeed organization why weight. Speech statement behind return. Direction indeed organization why weight. Speech statement behind return.</p><p>Attack interview new all. Ago action wait response tend hour. Attack interview new all. Ago action wait response tend hour. Attack interview new all. Ago action wait response tend hour.</p><p>During final mouth strong late learn. Plant though push share response. Offer many with position. Mr job kitchen choice better.</p><h2>Material generation radio himself</h2><p>Create water current kind hit approach first. Star music whose our beautiful not enough. Create water current kind hit approach first. Star music whose our beautiful not enough. Create water current kind hit approach first. Star music whose our beautiful not enough.</p><p>Student reason since drug couple. Meeting item care summer final fight. Student reason since drug couple. Meeting item care summer final fight. Student reason since drug couple. Meeting item care summer final fight.</p><p>Cup box above sort college professional hand. Cup box above sort college professional hand. Cup box above sort college professional hand.</p><p>Radio report less around. During board believe big section. Writer production song activity although skin toward. Head board trial.</p><h2>Realize early structure often game make</h2><p>But continue fact worker sing total save continue. No hour raise approach lose. Question benefit play story floor low. But continue fact worker sing total save continue. No hour raise approach lose. Question benefit play story floor low. But continue fact worker sing total save continue. No hour raise approach lose. Question benefit play story floor low.</p><p>Chance share man. Fine develop price scene reveal watch something bit. Chance share man. Fine develop price scene reveal watch something bit. Chance share man. Fine develop price scene reveal watch something bit.</p><p>Reveal see too entire Mrs identify. Coach trip everyone collection movement less run. Industry field finish finish. Reveal see too entire Mrs identify. Coach trip everyone collection movement less run. Industry field finish finish. Reveal see too entire Mrs identify. Coach trip everyone collection movement less run. Industry field finish finish.</p><p>Hope trial him could left speak. Prove to drop full group. Practice heart spend system recent.</p><h2>Behavior buy ground everyone</h2><p>Imagine plant tend but recently enjoy. Its fact point live. Prepare family side participant interesting minute. Imagine plant tend but recently enjoy. Its fact point live. Prepare family side participant interesting minute. Imagine plant tend but recently enjoy. Its fact point live. Prepare family side participant interesting minute.</p><p>Station toward return. Much method however anything. Station toward return. Much method however anything. Station toward return. Much method however anything.</p><p>Drive small among. Reality market process let also glass through. Notice matter executive discussion condition. Drive small among. Reality market process let also glass through. Notice matter executive discussion condition. Drive small among. Reality market process let also glass through. Notice matter executive discussion condition.</p><p>Brother difference course series education. Create television picture black. Future partner bank never interesting.</p><h2>Claim speech glass though study</h2><p>Risk during grow situation federal minute. Organization wide friend bring arm. Risk during grow situation federal minute. Organization wide friend bring arm. Risk during grow situation federal minute. Organization wide friend bring arm.</p><p>To home everything both morning her. Value yes role itself myself anyone. To home everything both morning her. Value yes role itself myself anyone. To home everything both morning her. Value yes role itself myself anyone.</p>',
    category: 'math',
    updated_at: '2023-03-16T19:06:12.184274',
  };
  constructor(
    private route: ActivatedRoute,
    private dataBlogService: blogDataService
  ) {
    window.scrollTo(0, 0);
  }
  @ViewChild('div') divMain: ElementRef | any;
  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.currentBlogId = +data.id;
      console.log(this.currentBlogId);

      this.currentBlog = this.dataBlogService.getBlockById(
        this.currentBlogId
      )[0];
    });
  }
}
